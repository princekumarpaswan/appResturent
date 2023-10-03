import { render, screen } from "@testing-library/react"
import Contact from "../Contact";
import "@testing-library/jest-dom"

test("Should load contact us component", () => {

    render(<Contact />)

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();

})

test("Should load contact us component button element", () => {
    render(<Contact />)

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
})

test("Should load contact us component button element text", () => {
    render(<Contact />)

    const button = screen.getByText("click me");

    expect(button).toBeInTheDocument();
})