package com.way.controller;

import com.way.model.Project;
import com.way.model.User;
import com.way.service.ProjectService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:tests-context.xml")
@TestExecutionListeners({DependencyInjectionTestExecutionListener.class})
public class ProjectControllerTests {

	private MockMvc mockMvc;

	@Autowired
	private ProjectController projectController;

	@Autowired
	private ProjectService projectService;

	private User user;

	private MockHttpSession session;

	@Before
	public void setup() {
		user = new User();
		session = new MockHttpSession();
		session.setAttribute("user", user);

		mockMvc = standaloneSetup(projectController).build();
	}

	@Test
	public void getProjectsWithoutAuthentication() throws Exception {
		mockMvc.perform(get("/projects.json"))
				.andExpect(status().isUnauthorized());
	}

	@Test
	public void getEmptyProjectsList() throws Exception {
		when(projectService.findAllByUser(user)).thenReturn(new ArrayList<Project>());

		mockMvc.perform(get("/projects.json").session(session))
				.andExpect(status().isOk())
				.andExpect(content().string("{\"data\":[],\"success\":true,\"totalCount\":0}"));
	}

	@Test
	public void getProjectsListWithOneItem() throws Exception {
		List<Project> projects = new ArrayList<Project>();
		projects.add(new Project());

		when(projectService.findAllByUser(user)).thenReturn(projects);

		mockMvc.perform(get("/projects.json").session(session))
				.andExpect(status().isOk())
				.andExpect(content().string("{\"data\":[{\"name\":null,\"id\":null}],\"success\":true,\"totalCount\":1}"));
	}

	@Test
	public void getProjectsListWithFewItems() throws Exception {
		List<Project> projects = new ArrayList<Project>();
		projects.add(new Project());
		projects.add(new Project());
		projects.add(new Project());

		when(projectService.findAllByUser(user)).thenReturn(projects);

		mockMvc.perform(get("/projects.json").session(session))
				.andExpect(status().isOk())
				.andExpect(content().string("{\"data\":[{\"name\":null,\"id\":null},{\"name\":null,\"id\":null},{\"name\":null,\"id\":null}],\"success\":true,\"totalCount\":3}"));
	}

}