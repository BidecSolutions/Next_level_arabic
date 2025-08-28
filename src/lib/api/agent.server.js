// src/lib/api/agent.server.js
import axios from "axios";
import axiosClient from "./axiosClient";

export async function getExcellentAgents() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/agents/excellentAgents`);
    return res.data.data.filter(
      (agent) => agent.status == 1 && agent?.excellent == 1
    );
  } catch (error) {
    console.error("Error fetching agents:", error);
    return [];
  }
}

export async function getAgentListBannerDetails() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/agent-list-settings/agent-list-details/1`
    );
    const responseData = response.data.data;

    if (responseData.status === "1") {
      return responseData;
    } else {
      return {
        banner_title: "Our Agents",
        banner_description: "",
        image_path: null,
      };
    }
  } catch (error) {
    console.error("Agent List API Error:", error);
    return {
      banner_title: "Our Agents",
      banner_description: "",
      image_path: null,
    };
  }
}

export async function fetchOwnerDetails() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/owner-details`);

    const filteredProperties = response.data.data.filter(
      (property) => property.status === 1
    );

    if (filteredProperties.length > 0) {
      return filteredProperties.sort(
        (a, b) => new Date(b.created_date) - new Date(a.created_date)
      )[0];
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error(
      "Error fetching owner details:",
      error.response?.data || error.message
    );
    return null;
  }
}

export async function getAgentsDepartmentWise() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/agents/agentsDepartmentWise`);
    const rawData = response.data.data;

    return rawData
      .map((dept) => ({
        ...dept,
        agents: dept.agents.filter(
          (agent) => agent.status === 1 && dept?.name !== "Technical Department"
        ),
      }))
      .filter((dept) => dept.agents.length > 0);
  } catch (error) {
    console.error("Agent DepartmentWise API Error:", error);
    return [];
  }
}

export const fetchAgentDetails = async (slug) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/agents/showBySlug`, {
      slug,
    });
    if (response.data.status === "success") {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, data: null };
    }
  } catch (error) {
    console.error("Error fetching agent details:", error);
    return { success: false, data: null };
  }
};

export const fetchAgentFeaturedProperties = async (agentId) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}user/agents/featuresPropertyList`,
    { agent_id: agentId }
  );
  return response.data.data;
};

export const sendInquiry = async (payload) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/inquiry-forms/store`, payload);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

export const getAgentPropertyList = async ({
  agent_id,
  from_amount,
  to_amount,
  property_status,
  sort_by,
}) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/agents/propertyList`, {
    agent_id,
    from_amount,
    to_amount,
    property_status,
    sort_by,
  });
  return response.data.data;
};



export const fetchAreaSpecialization = async (agentId) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/agents/areaOfSpecialization`, {
      agent_id: agentId,
    });

    const filtered = response.data.data.filter(
      (property) => property.status === 1
    );

    return { success: true, data: filtered };
  } catch (error) {
    console.error("Error fetching area specialization:", error);
    return { success: false, data: [] };
  }
};
