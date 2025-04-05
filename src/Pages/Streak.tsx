import React, { useEffect, useState } from "react";

function Streak() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const storedStreak = localStorage.getItem("streak");
    const lastVisit = localStorage.getItem("lastVisit");

    const today = new Date().setHours(0, 0, 0, 0);
    const lastVisitDate = lastVisit ? new Date(lastVisit).setHours(0, 0, 0, 0) : null;

    if (lastVisitDate === today) {
      return; // User already visited today, do nothing
    }

    if (lastVisitDate && today - lastVisitDate === 86400000) {
      // If last visit was yesterday, increase the streak
      const newStreak = Number(storedStreak) + 1;
      setStreak(newStreak);
      localStorage.setItem("streak", newStreak);
    } else {
      // If the last visit was before yesterday or null, reset streak
      setStreak(1);
      localStorage.setItem("streak", 1);
    }

    localStorage.setItem("lastVisit", new Date().toISOString());
  }, []);

  return (
    <div>
      <h2>🔥 Streak: {streak} days</h2>
    </div>
  );
}

export default Streak;
