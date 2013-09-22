package com.way.service;

import com.way.model.Project;
import com.way.model.User;

import java.util.List;

public interface ProjectService {

    public Project save(Project project);

    List<Project> findAll();

    void delete(Long id);

    Project findOne(Long id);

    List<Project> findAllByUser(User user);
}
