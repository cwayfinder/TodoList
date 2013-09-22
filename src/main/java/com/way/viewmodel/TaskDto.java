package com.way.viewmodel;


import com.way.model.Task;

public class TaskDto {

    private Long id;

    private String text;

    private boolean done;

    private int priority;

	private Long deadline;

    private Long projectId;

    public TaskDto() {
    }

    public TaskDto(Task task) {
        id = task.getId();
        text = task.getText();
        projectId = task.getProject().getId();
        done = task.isDone();
        priority = task.getPriority();
        deadline = task.getDeadline() == null ? null : task.getDeadline().getTime();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

	public Long getDeadline() {
		return deadline;
	}

	public void setDeadline(Long deadline) {
		this.deadline = deadline;
	}

	public int getPriority() {
		return priority;
	}

	public void setPriority(int priority) {
		this.priority = priority;
	}
}
