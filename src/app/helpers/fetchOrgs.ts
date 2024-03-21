export const fetchOrgs = async (setData: any) => {
  fetch("https://sqorz-project.vercel.app/api/sqorz/region_au", {
    mode: "cors",
  })
    .then((res) => res.json())
    .then((data) => {
      setData(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
};
