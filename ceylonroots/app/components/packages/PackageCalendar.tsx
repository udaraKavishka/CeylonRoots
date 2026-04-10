"use client";

import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Button } from "../ui/button";
import { Users, DollarSign, Calendar } from "lucide-react";
import api from "../../service/api";

interface Departure {
  id: number;
  packageId: number;
  departureDate: string;
  maxSlots: number;
  bookedSlots: number;
  priceOverride: number | null;
  status: string;
}

interface PackageCalendarProps {
  packageId: number;
  basePrice: number;
}

const statusBadge: Record<string, string> = {
  available: "bg-green-100 text-green-800",
  limited: "bg-yellow-100 text-yellow-800",
  full: "bg-red-100 text-red-800",
};

const PackageCalendar: React.FC<PackageCalendarProps> = ({
  packageId,
  basePrice,
}) => {
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedDeparture, setSelectedDeparture] = useState<Departure | null>(
    null
  );

  useEffect(() => {
    api.get<Departure[]>(`/departures?packageId=${packageId}`)
      .then((data) => {
        setDepartures(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [packageId]);

  const availableDates = departures
    .filter((d) => d.status === "available")
    .map((d) => new Date(d.departureDate));

  const limitedDates = departures
    .filter((d) => d.status === "limited")
    .map((d) => new Date(d.departureDate));

  const fullDates = departures
    .filter((d) => d.status === "full")
    .map((d) => new Date(d.departureDate));

  const handleDaySelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (!date) {
      setSelectedDeparture(null);
      return;
    }
    const dep = departures.find((d) => {
      const dDate = new Date(d.departureDate);
      return (
        dDate.getFullYear() === date.getFullYear() &&
        dDate.getMonth() === date.getMonth() &&
        dDate.getDate() === date.getDate()
      );
    });
    setSelectedDeparture(dep ?? null);
  };

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground py-4">
        Loading availability calendar...
      </p>
    );
  }

  if (departures.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        <Calendar className="h-8 w-8 mx-auto mb-2 opacity-30" />
        <p className="text-sm">No scheduled departures yet.</p>
        <p className="text-xs mt-1">Contact us to arrange a custom date.</p>
      </div>
    );
  }

  const allDepartureDates = departures.map((d) => new Date(d.departureDate));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
          Available
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
          Limited spots
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
          Sold out
        </span>
      </div>

      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={handleDaySelect}
        disabled={[
          { before: new Date() },
          (date) =>
            !allDepartureDates.some(
              (d) =>
                d.getFullYear() === date.getFullYear() &&
                d.getMonth() === date.getMonth() &&
                d.getDate() === date.getDate()
            ),
        ]}
        modifiers={{
          available: availableDates,
          limited: limitedDates,
          full: fullDates,
        }}
        modifiersStyles={{
          available: {
            backgroundColor: "#d1fae5",
            color: "#166534",
            borderRadius: "50%",
          },
          limited: {
            backgroundColor: "#fef9c3",
            color: "#92400e",
            borderRadius: "50%",
          },
          full: {
            backgroundColor: "#fee2e2",
            color: "#991b1b",
            borderRadius: "50%",
            opacity: 0.6,
          },
        }}
        className="mx-auto"
      />

      {selectedDeparture && (
        <div className="border rounded-lg p-4 space-y-3 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="font-medium text-sm">
              {new Date(selectedDeparture.departureDate).toLocaleDateString(
                "en-US",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </p>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusBadge[selectedDeparture.status] ?? "bg-gray-100 text-gray-700"}`}
            >
              {selectedDeparture.status}
            </span>
          </div>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {selectedDeparture.maxSlots -
                selectedDeparture.bookedSlots} / {selectedDeparture.maxSlots}{" "}
              spots left
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />$
              {(selectedDeparture.priceOverride ?? basePrice).toLocaleString()}{" "}
              per person
            </span>
          </div>

          {selectedDeparture.status !== "full" && (
            <Button
              size="sm"
              className="w-full ceylon-button-primary"
              onClick={() => {
                const dep = selectedDeparture;
                const dateStr = new Date(dep.departureDate).toLocaleDateString(
                  "en-US"
                );
                const pkg = localStorage.getItem("bookingPackage");
                if (pkg) {
                  const parsed = JSON.parse(pkg);
                  parsed.selectedDepartureDate = dateStr;
                  parsed.selectedDepartureId = dep.id;
                  localStorage.setItem(
                    "bookingPackage",
                    JSON.stringify(parsed)
                  );
                }
                window.location.href = "/checkout";
              }}
            >
              Book This Departure
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PackageCalendar;
