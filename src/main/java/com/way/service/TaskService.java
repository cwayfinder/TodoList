package com.way.service;

import com.way.model.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TaskService {

    public Task save(Task task);

    Page<Task> findAll(Pageable pageable);

    void delete(Long id);

    Task findOne(Long id);

    Page<Task> findAllByProjectId(Long projectId, Pageable pageable);

    List<Task> findAllByProjectId(Long projectId);
}
