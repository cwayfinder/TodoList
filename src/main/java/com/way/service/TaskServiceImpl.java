package com.way.service;

import com.way.model.Task;
import com.way.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository repository;

    @Override
    public Task save(Task task) {
        return repository.save(task);
    }

    @Override
    public Page<Task> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
        repository.delete(id);
    }

    @Override
    public Task findOne(Long id) {
        return repository.findOne(id);
    }

    @Override
    public Page<Task> findAllByProjectId(Long projectId, Pageable pageable) {
        return repository.findAllByProjectId(projectId, pageable);
    }

	@Override
	public List<Task> findAllByProjectId(Long projectId) {
		return repository.findAllByProjectId(projectId);
	}
}
