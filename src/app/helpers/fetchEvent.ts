export const fetchEvents = async (orgId: string, setEvents: any) => {
  fetch("https://sqorz-project.vercel.app/api/sqorz/event_au?id=" + orgId, {
    mode: "cors",
  })
    .then((res) => res.json())
    .then((data) => {
      setEvents(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
};
