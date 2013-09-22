package com.way.service;

import com.way.model.Project;
import com.way.model.User;
import com.way.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository repository;

    @Override
    public Project save(Project project) {
        return repository.save(project);
    }

    @Override
    public List<Project> findAll() {
        return repository.findAll();
    }

    @Override
    public void delete(Long id) {
        repository.delete(id);
    }

    @Override
    public Project findOne(Long id) {
        return repository.findOne(id);
    }

    @Override
    public List<Project> findAllByUser(User user) {
        return repository.findAllByUser(user);
    }
}
