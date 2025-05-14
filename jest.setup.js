import "@testing-library/jest-dom";

jest.mock("@mui/material", () => {
  const actual = jest.requireActual("@mui/material");
  return {
    ...actual,
    useMediaQuery: jest.fn().mockReturnValue(false),
  };
});

jest.mock("@mui/x-date-pickers/TimePicker", () => ({
  TimePicker: ({ label, value, onChange, slotProps }) => {
    return (
      <div>
        <label htmlFor="time-picker">{label}</label>
        <input
          id="time-picker"
          type="time"
          value={value ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label}
          data-testid="time-picker"
        />
        {slotProps?.textField?.error && <p>{slotProps.textField.helperText}</p>}
      </div>
    );
  },
}));

jest.mock("@mui/x-date-pickers/LocalizationProvider", () => ({
  LocalizationProvider: ({ children }) => <div>{children}</div>,
}));

jest.mock("@mui/x-date-pickers/AdapterDayjs", () => ({
  AdapterDayjs: jest.fn(),
}));

global.ResizeObserver = class ResizeObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
};

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
