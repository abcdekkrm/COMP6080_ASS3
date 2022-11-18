import { render, screen, fireEvent } from "@testing-library/react";
import SelectSmall from "../SelectBox";

describe ('SelectSmall', () => {
    it('render selectbox - selct and options exist', () => {
        render(<SelectSmall currValue={'0'}/>);
        expect(screen.getByRole('select')).toBeInTheDocument();
        expect(screen.getAllByRole('option').length == 11);
    });
    it('render selectbox - test onchange function', () => {
        const onChange = jest.fn();
        render(<SelectSmall currValue={'0'} handleChange={onChange}/>);
        expect(screen.getByRole('select').currValue == 0);
        fireEvent.change(screen.getByRole('select'), { target: { currValue: '2' } })
        expect(screen.getByRole('select').currValue == 2);
    })
})