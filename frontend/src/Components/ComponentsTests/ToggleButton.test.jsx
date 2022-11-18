import { render, screen, fireEvent } from "@testing-library/react";
import { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-15';
import userEvent from '@testing-library/user-event'
import ColorToggleButton from "../ToggleButton";

describe ('ToggleButton', () => {
    it('render ToggelButton', () => {
        render(<ColorToggleButton />);
        expect(screen.getByRole('toggleGroup')).toBeInTheDocument();
        expect(screen.getByText('House')).toBeInTheDocument();
        expect(screen.getByText('Apartment')).toBeInTheDocument();
        expect(screen.getByText('Guesthouse')).toBeInTheDocument();
        expect(screen.getByText('Hotel')).toBeInTheDocument();
    });
    it('render ToggelButton - test button', () => {
        const onChange = jest.fn();
        // const component = shallow(<ColorToggleButton onChange={onChange} type={'apartment'}/>);
    })
})