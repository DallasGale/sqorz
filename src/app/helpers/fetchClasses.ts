export const fetchClasses = async (orgId: string, setEvents: any) => {
  fetch("https://sqorz-project.vercel.app/api/sqorz/classes_au?id=" + orgId, {
    mode: "cors",
  })
    .then((res) => res.json())
    .then((data) => {
      setEvents(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
};
