"use client";

import { useEffect } from "react";

export default function PerformanceProvider() {
  useEffect(() => {
    // Check if the device is highly capable (>= 6 cores OR >= 6GB RAM)
    // navigator.hardwareConcurrency is widely supported (CPU cores)
    // navigator.deviceMemory is Chrome/Android only (RAM in GB)
    
    const cpuCores = navigator.hardwareConcurrency || 4;
    // @ts-ignore - deviceMemory is not in standard TS lib yet
    const ram = navigator.deviceMemory || 4;

    const isPowerful = cpuCores >= 6 || ram >= 6;

    if (isPowerful) {
      document.body.classList.add("high-perf-device");
    }
  }, []);

  return null;
}
