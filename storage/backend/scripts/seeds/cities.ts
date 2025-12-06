import { CityInsert } from "@/locations/cities/city.model";
import { DbClient } from "./shared/db";

const cities: CityInsert[] = [
  new CityInsert({ id: "hanoi", name: "Hà Nội" }),
  new CityInsert({ id: "haiphong", name: "Hải Phòng" }),
  new CityInsert({ id: "danang", name: "Đà Nẵng" }),
  new CityInsert({ id: "hcm", name: "Hồ Chí Minh" }),
  new CityInsert({ id: "nhatrang", name: "Nha Trang" }),
];

async function run() {
  const db = DbClient.getInstance().db;

  const query = db.insertInto("cities").values(cities);
  await query.execute();

  console.log("Inserted", cities.length, "cities");

  db.destroy();
}

run();
