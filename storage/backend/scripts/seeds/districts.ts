import { DistrictInsert } from "@/locations/districts/district.model";
import { DbClient } from "./shared/db";

const districts: DistrictInsert[] = [
  new DistrictInsert({ id: "badinh", name: "Ba Đình" }),
  new DistrictInsert({ id: "hoankiem", name: "Hoàn Kiếm" }),
  new DistrictInsert({ id: "haibatrung", name: "Hai Bà Trưng" }),
  new DistrictInsert({ id: "dongda", name: "Đống Đa" }),
  new DistrictInsert({ id: "tayho", name: "Tây Hồ" }),
  new DistrictInsert({ id: "caugiay", name: "Cầu Giấy" }),
  new DistrictInsert({ id: "thanhxuan", name: "Thanh Xuân" }),
  new DistrictInsert({ id: "hoangmai", name: "Hoàng Mai" }),
  new DistrictInsert({ id: "longbien", name: "Long Biên" }),
  new DistrictInsert({ id: "hadong", name: "Hà Đông" }),
  new DistrictInsert({ id: "namtuliem", name: "Nam Từ Liêm" }),
  new DistrictInsert({ id: "bactuliem", name: "Bắc Từ Liêm" }),
];

async function run() {
  const db = DbClient.getInstance().db;

  const query = db.insertInto("districts").values(districts);
  await query.execute();

  console.log("Inserted", districts.length, "districts");

  db.destroy();
}

run();
