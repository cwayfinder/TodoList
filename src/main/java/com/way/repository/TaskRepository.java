package com.way.repository;

import com.way.model.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("taskRepository")
public interface TaskRepository extends JpaRepository<Task, Long> {

    Page<Task> findAllByProjectId(Long projectId, Pageable pageable);

	List<Task> findAllByProjectId(Long projectId);
}
