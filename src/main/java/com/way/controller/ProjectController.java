package com.way.controller;

import com.way.model.Project;
import com.way.model.User;
import com.way.service.ProjectService;
import com.way.viewmodel.ListResponse;
import com.way.viewmodel.ProjectDto;
import com.way.viewmodel.SingleResponse;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Controller
public class ProjectController {

    @Autowired
    private ProjectService service;

    @RequestMapping(value = "/projects/{projectId}", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public SingleResponse<ProjectDto> getFact(@PathVariable Long projectId) throws IOException {
        System.out.println("Project retrieved.");
        Project project = service.findOne(projectId);
        return new SingleResponse<ProjectDto>(true, new ProjectDto(project));
    }

    @RequestMapping(value = "/projects", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public ListResponse<ProjectDto> getFacts(HttpSession session, HttpServletResponse response) throws IOException {
        System.out.println("Project search.");

        if (getUser() == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return null;
        } else {
            List<Project> projects = service.findAllByUser(getUser());

            List<ProjectDto> dtos = new ArrayList<ProjectDto>();
            for (Project project : projects) {
                dtos.add(new ProjectDto(project));
            }

            return new ListResponse<ProjectDto>(true, dtos, projects.size());
        }
    }

    private User getUser() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpSession session = attr.getRequest().getSession();

        return (User) session.getAttribute("user");
    }

    @RequestMapping(value = "/projects", method = RequestMethod.POST, produces = "application/json", consumes = "application/json", headers = "Accept=application/json")
    @ResponseBody
    public SingleResponse<ProjectDto> createProject(@RequestBody String json, HttpSession session) throws IOException {
        System.out.println("Project created.");
//        Project project = new JSONDeserializer<Project>().use(null, Project.class).deserialize(json);
        ObjectMapper mapper = new ObjectMapper();
        Project project = mapper.readValue(json, Project.class);
        project.setUser(getUser());
        project = service.save(project);
        return new SingleResponse<ProjectDto>(true, new ProjectDto(project));
    }

    @RequestMapping(value = "/projects/{projectId}", method = RequestMethod.PUT, produces = "application/json", consumes = "application/json")
    @ResponseBody
    public SingleResponse<ProjectDto> updateProject(@PathVariable Long projectId, @RequestBody Project project) throws IOException {
        System.out.println("Project updated.");
        project.setUser(getUser());
        project = service.save(project);
        return new SingleResponse<ProjectDto>(true, new ProjectDto(project));
    }

    @RequestMapping(value = "/projects/{id}", method = RequestMethod.DELETE, headers = "Accept=application/json")
    public ResponseEntity<String> deleteProject(@PathVariable("id") Long id) {
        Project base = service.findOne(id);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        if (base == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        service.delete(id);
        return new ResponseEntity<String>(headers, HttpStatus.OK);
    }
}
