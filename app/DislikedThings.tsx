"use client";

import { useState } from "react";

export function DislikedThings() {
  const [inputValue, setInputValue] = useState("");
  const [things, setThings] = useState<string[]>([]);

  function addThing(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedValue = inputValue.trim();

    if (trimmedValue === "") {
      return;
    }

    setThings([...things, trimmedValue]);
    setInputValue("");
  }

  function deleteThing(indexToDelete: number) {
    setThings(things.filter((_, index) => index !== indexToDelete));
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Dinge, die ich nicht mag</h1>
        <p className="text-gray-600">
          Schreibe Dinge auf, die du nicht magst.
        </p>
      </div>

      <form onSubmit={addThing} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="z.B. Tomaten"
          className="flex-1 rounded border border-gray-300 px-3 py-2"
        />

        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Hinzufügen
        </button>
      </form>

      <ul className="space-y-2">
        {things.map((thing, index) => (
          <li
            key={`${thing}-${index}`}
            onClick={() => deleteThing(index)}
            className="cursor-pointer rounded border border-gray-300 px-3 py-2 hover:bg-gray-100"
            title="Klicken zum Löschen"
          >
            {thing}
          </li>
        ))}
      </ul>

      {things.length === 0 && (
        <p className="text-gray-500">Noch keine Einträge vorhanden.</p>
      )}
    </div>
  );
}