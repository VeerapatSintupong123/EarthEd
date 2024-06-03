import { Geo } from "@/libs/orderUnit";

export default function SelectUnitsGeo({ sub }: { sub: string }) {
  var array: string[] = Geo(sub);

  return array.length > 0 ? (
    <>
      <option value="" disabled selected>
        Select Unit
      </option>
      {array.map((unit, index) =>
        unit ? (
          <option key={index} value={unit}>
            {unit}
          </option>
        ) : null
      )}
    </>
  ) : (
    <>
      <option value="" disabled selected>
        Select Unit
      </option>
    </>
  );
}
