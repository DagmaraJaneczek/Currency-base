import { render, screen, cleanup } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';


describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />)
    });

    it('should render proper info about conversion when PLN -> USD', () => {

        const testCases = [
            {from: 'PLN', to: 'USD', amount: '10', output: 'PLN 12.00 =  $3.43'},
            {from: 'PLN', to: 'USD', amount: '20', output: 'PLN 20.00 =  $5.71'},
            {from: 'PLN', to: 'USD', amount: '2', output: 'PLN 2.00 =  $0.57'},
            {from: 'PLN', to: 'USD', amount: '100', output: 'PLN 100.00 =  $28.57'},
        ];

        for(const testObj of testCases) {
            render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(testObj.output);

            cleanup();
        }

    });
});