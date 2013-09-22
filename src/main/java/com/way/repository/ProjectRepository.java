package com.way.repository;

import com.way.model.Project;
import com.way.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("projectRepository")
public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findAllByUser(User user);
}
