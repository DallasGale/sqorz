export const fetchClasses = async (id: string, setData: any) => {
  fetch("https://sqorz-project.vercel.app/api/sqorz/classes_au?id=" + id, {
    mode: "cors",
  })
    .then((res) => res.json())
    .then((data) => {
      setData(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
};
