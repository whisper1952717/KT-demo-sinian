import dayjs from "dayjs";
import type { HourlyDualPower } from "@/types/report";

export const hourlyPower: HourlyDualPower[] = Array.from({ length: 24 }).map((_, hour) => {
  const loadWave = Math.sin((hour / 24) * Math.PI * 2) * 120;
  const originalPower = 620 + loadWave + (hour > 9 && hour < 18 ? 120 : 40);
  const newSystemPower = 430 + loadWave * 0.75 + (hour > 9 && hour < 18 ? 90 : 30);
  const sharedPower = 35 + (hour > 9 && hour < 18 ? 12 : 5);
  const totalPower = originalPower + newSystemPower + sharedPower;
  // Keep COP in a realistic 3.x range and keep coolingLoad/systemCop consistent.
  const targetCop = 3.35 + Math.sin(((hour - 2) / 24) * Math.PI * 2) * 0.25 + (hour > 9 && hour < 18 ? 0.08 : -0.04);
  const coolingLoad = totalPower * targetCop;

  return {
    hour,
    originalPower: Number(originalPower.toFixed(1)),
    newSystemPower: Number(newSystemPower.toFixed(1)),
    sharedPower: Number(sharedPower.toFixed(1)),
    totalPower: Number(totalPower.toFixed(1)),
    systemCop: Number((coolingLoad / totalPower).toFixed(2)),
    outdoorTemp: Number((22 + Math.sin(((hour - 5) / 24) * Math.PI * 2) * 6).toFixed(1)),
    coolingLoad: Number(coolingLoad.toFixed(1)),
    zone1Temp: Number((16 + Math.sin((hour / 24) * Math.PI * 2) * 0.5).toFixed(1)),
    zone2Temp: Number((16 + Math.cos((hour / 24) * Math.PI * 2) * 0.4).toFixed(1)),
    zone3Temp: Number((16 + Math.sin(((hour + 2) / 24) * Math.PI * 2) * 0.45).toFixed(1)),
  };
});

export const dailyEnergy = Array.from({ length: 30 }).map((_, index) => {
  const date = dayjs().subtract(29 - index, "day");
  const weatherFactor = 1 + Math.sin((index / 30) * Math.PI) * 0.12;

  const originalChiller = 6400 * weatherFactor;
  const originalPump = 1700 * weatherFactor;
  const originalCooling = 1480 * weatherFactor;
  const originalTower = 950 * weatherFactor;
  const originalSubtotal = originalChiller + originalPump + originalCooling + originalTower;

  const newChiller = 4700 * weatherFactor;
  const newPump = 1320 * weatherFactor;
  const newCooling = 1120 * weatherFactor;
  const newTower = 720 * weatherFactor;
  const newSubtotal = newChiller + newPump + newCooling + newTower;

  const sharedWater = 340;
  const sharedMakeup = 180;
  const sharedSubtotal = sharedWater + sharedMakeup;

  const total = originalSubtotal + newSubtotal + sharedSubtotal;
  const baseline = total * 1.12;
  const saving = baseline - total;

  return {
    date: date.format("YYYY-MM-DD"),
    original: {
      chiller: Number(originalChiller.toFixed(1)),
      chilledPump: Number(originalPump.toFixed(1)),
      coolingPump: Number(originalCooling.toFixed(1)),
      coolingTower: Number(originalTower.toFixed(1)),
      subtotal: Number(originalSubtotal.toFixed(1)),
    },
    newSystem: {
      chiller: Number(newChiller.toFixed(1)),
      chilledPump: Number(newPump.toFixed(1)),
      coolingPump: Number(newCooling.toFixed(1)),
      coolingTower: Number(newTower.toFixed(1)),
      subtotal: Number(newSubtotal.toFixed(1)),
    },
    shared: {
      waterTreatment: Number(sharedWater.toFixed(1)),
      makeupWater: Number(sharedMakeup.toFixed(1)),
      subtotal: Number(sharedSubtotal.toFixed(1)),
    },
    total: Number(total.toFixed(1)),
    baseline: Number(baseline.toFixed(1)),
    saving: Number(saving.toFixed(1)),
    savingRate: Number(((saving / baseline) * 100).toFixed(1)),
    outdoorTemp: Number((23 + Math.sin(index / 5) * 5).toFixed(1)),
    outdoorHumidity: Number((58 + Math.cos(index / 4) * 9).toFixed(1)),
    systemCop: Number((4.75 + Math.sin(index / 8) * 0.2).toFixed(2)),
    coolingLoad: Number((12100 * weatherFactor).toFixed(1)),
  };
});

