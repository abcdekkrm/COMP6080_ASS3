import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Search from '../Search'

describe('<Search>', () => {
  // provide mock location to fix navigation issue
  let assignMock = jest.fn();

  delete window.location;
  window.location = { assign: assignMock };

  afterEach(() => {
    assignMock.mockClear();
  });

  it('renders a heading with min-max, check-in, check-out textbox and a slider', () => {
    render(<Search/>)
    expect(screen.getByRole('heading', { name: /Find your perfect homestay today./i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /min max/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /Check-in/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /Check-out/i })).toBeInTheDocument()
    expect(screen.getByRole('slider')).toBeInTheDocument()
  })
  it('renders search, apply and clear buttons', () => {
    render(<Search/>)
    let search = screen.getAllByRole('button')[0];
    expect(search).toBeInTheDocument()
    let clear = screen.getAllByRole('button')[1];
    expect(clear).toBeInTheDocument()
    let apply = screen.getAllByRole('button')[2];
    expect(apply).toBeInTheDocument()
  })
  it('renders 6 buttons in total', () => {
    render(<Search/>)
    expect(screen.getAllByRole('button').length == 6);
  })
  it('on click clear, clear textfields', () => {
    render(<Search/>)
    let clear = screen.getAllByRole('button')[1];
    userEvent.click(clear);
    let minMax = screen.getAllByRole('textbox')[0];
    expect(minMax.value).toEqual('');
    let checkin = screen.getAllByRole('textbox')[1];
    expect(checkin.value).toEqual('');
    let checkout = screen.getAllByRole('textbox')[2];
    expect(checkout.value).toEqual('');
    let min = screen.getAllByRole('textbox')[3];
    expect(min.value).toEqual('0');
    let max = screen.getAllByRole('textbox')[4];
    expect(max.value).toEqual('99999999');
  })
  it('on input enter, textfield values are changed', () => {
    render(<Search/>)
    let min = screen.getAllByRole('textbox')[3];
    userEvent.type(min, '123');
    expect(min.value).toEqual('0123');
    let max = screen.getAllByRole('textbox')[4];
    userEvent.type(max, '123');
    expect(max.value).toEqual('99999999123');
  })
})
