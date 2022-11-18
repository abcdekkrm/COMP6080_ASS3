import { render, screen, fireEvent } from "@testing-library/react";
import SelectSmall from "../SelectBox";

describe ('SelectSmall', () => {
    it('render selectbox - selct and options exist', () => {
        render(<SelectSmall currValue={'0'}/>);
        expect(screen.getByRole('select')).toBeInTheDocument();
        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(11);
    });
    it('render selectbox - test onchange function', () => {
        render(<SelectSmall currValue={'0'}/>);
        fireEvent.change(screen.getByRole('select'), { target: { currValue: '2' } })
        expect(screen.getByRole('select').currValue).toBe('2');
    })
})