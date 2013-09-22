package com.way.viewmodel;


import com.way.model.Project;

public class ProjectDto {

    private Long id;

    private String name;

    public ProjectDto() {
    }

    public ProjectDto(Project project) {
        id = project.getId();
        name = project.getName();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
