package com.way.controller;

import com.way.model.Task;
import com.way.service.ProjectService;
import com.way.service.TaskService;
import com.way.viewmodel.TaskDto;
import com.way.viewmodel.ListResponse;
import com.way.viewmodel.SingleResponse;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
public class TaskController {

    @Autowired
    private TaskService service;

    @Autowired
    private ProjectService projectService;

    @RequestMapping(value = "/tasks/{taskId}", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public SingleResponse<TaskDto> getFact(@PathVariable Long taskId) throws IOException {
        System.out.println("Task retrieved.");
        Task task = service.findOne(taskId);
        return new SingleResponse<TaskDto>(true, new TaskDto(task));
    }

    @RequestMapping(value="/projects/{projectId}/tasks", method= RequestMethod.GET, produces="application/json")
    @ResponseBody
    public ListResponse<TaskDto> getFacts(@PathVariable Long projectId, HttpServletRequest request) throws IOException {
        System.out.println("Task search.");

        int page = Integer.parseInt(request.getParameter("page")) - 1;
        int pageSize = Integer.parseInt(request.getParameter("limit"));

        Pageable pageable = new PageRequest(page, pageSize);

        Page<Task> taskPage = service.findAllByProjectId(projectId, pageable);

        List<TaskDto> dtos = new ArrayList<TaskDto>();
        for (Task task : taskPage) {
            dtos.add(new TaskDto(task));
        }

        return new ListResponse<TaskDto>(true, dtos, taskPage.getTotalElements());
    }

    @RequestMapping(value = "/tasks", method = RequestMethod.POST, produces = "application/json", consumes = "application/json", headers = "Accept=application/json")
    @ResponseBody
    public SingleResponse<TaskDto> createQuestion(@RequestBody String json) throws IOException {
        System.out.println("Task created.");

        ObjectMapper mapper = new ObjectMapper();
        TaskDto dto = mapper.readValue(json, TaskDto.class);

        Task task = new Task();
        task.setText(dto.getText());
        task.setDone(dto.isDone());
        task.setProject(projectService.findOne(dto.getProjectId()));
		task.setPriority(service.findAllByProjectId(dto.getProjectId()).size());
//		task.setPriority(1);
        task = service.save(task);

        return new SingleResponse<TaskDto>(true, new TaskDto(task));
    }

    @RequestMapping(value = "/tasks/{taskId}", method = RequestMethod.PUT, produces = "application/json", consumes = "application/json")
    @ResponseBody
    public SingleResponse<TaskDto> updateQuestion(@PathVariable Long taskId, @RequestBody String json) throws IOException {
        System.out.println("Task updated.");

		ObjectMapper mapper = new ObjectMapper();
		TaskDto dto = mapper.readValue(json, TaskDto.class);

        Task task = new Task();
        task.setId(dto.getId());
        task.setProject(projectService.findOne(dto.getProjectId()));
        task.setText(dto.getText());
        task.setDone(dto.isDone());
        task.setPriority(dto.getPriority());
        task.setDeadline(dto.getDeadline() == null ? null : new Date(dto.getDeadline()));

        task = service.save(task);
        return new SingleResponse<TaskDto>(true, new TaskDto(task));
    }

    @RequestMapping(value = "/tasks/{id}", method = RequestMethod.DELETE, headers = "Accept=application/json")
    public ResponseEntity<String> deleteQuestion(@PathVariable("id") Long id) {
        Task base = service.findOne(id);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        if (base == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }

		Long projectId = base.getProject().getId();
        service.delete(id);

		for (Task task : service.findAllByProjectId(projectId)) {
			if (task.getPriority() >= base.getPriority()) {
				task.setPriority(task.getPriority() - 1);
				service.save(task);
			}
		}
        return new ResponseEntity<String>(headers, HttpStatus.OK);
    }
}
