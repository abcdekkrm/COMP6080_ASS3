import { render, screen, fireEvent } from "@testing-library/react";
import Nav from "../Nav";

describe ('Nav', () => {
    it('render Nav - Nav bar before login', () => {
        render(<Nav />);
        expect(screen.getByRole('logo')).toBeInTheDocument();
        expect(screen.getByText(/AirBrB/i)).toBeInTheDocument();
        expect(screen.getByRole('loginButton')).toBeInTheDocument();
    });
})
