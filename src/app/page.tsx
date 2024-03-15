"use client";

// import Image from "next/image";
import { Button, Input, Select, TextInput } from "@mantine/core";
import { useEffect } from "react";

export default function Home() {
  const fetchOrgs = async () => {
    fetch("https://our.sqorz.com/json/region/au")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    fetchOrgs();
  });
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div>
        Step 1
        <Select placeholder="Select Org" />
      </div>

      <div>
        Step 2
        <Select placeholder="Select active series" />
      </div>

      <div>
        Step 3
        <Select placeholder="Select class" />
      </div>
      <div>
        Step 4<br />
        <Button variant="outline">Show latest round results</Button>
      </div>
      <div>
        Step 4<br />
        <Button variant="outline">Show combined round leaders</Button>
      </div>
    </main>
  );
}
