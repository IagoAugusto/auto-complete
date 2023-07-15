import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import "./AutoComplete.css";

interface Placeholder {
  title: string;
  id: number;
}

function AutoComplete() {
  const [placeholders, setPlaceholders] = useState<Array<Placeholder>>([]);
  const [query, setQuery] = useState<string>("");
  const value = useDebounce(query, 500);

  function getPlaceholders() {
    if (!value) return;
    fetch(`https://jsonplaceholder.typicode.com/todos?q=${value}`)
      .then((response) => response.json())
      .then(setPlaceholders);
  }

  function handleOnChange({ target }: ChangeEvent<HTMLInputElement>) {
    setQuery(target.value);
  }

  function highlightSelectedText(text: string, query: string) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<span class='highlighted'>$1</span>");
  }

  useEffect(getPlaceholders, [value]);

  return (
    <div className="auto-complete">
      <div className="auto-complete__container">
        <label className="auto-complete__label" htmlFor="auto-complete">
          Search placeholders
        </label>
        <input
          className="auto-complete__input"
          id="auto-complete"
          name="auto-complete"
          onChange={handleOnChange}
          placeholder="Type to search..."
        />
        <div className="auto-complete__results">
          {placeholders?.map((placeholder) => (
            <a
              className="auto-complete__option"
              data-value={placeholder.id}
              key={placeholder.id}
              href={`https://jsonplaceholder.typicode.com/todos/${placeholder.id}`}
              target="_blank"
              rel="noreferrer"
            >
              <p
                // I would usually use react-html-parser for this
                dangerouslySetInnerHTML={{
                  __html: highlightSelectedText(placeholder.title, value),
                }}
              ></p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AutoComplete;
