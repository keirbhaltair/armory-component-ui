import React from 'react';
import proxyquire from 'proxyquire';
import { shallow } from 'enzyme';

const { default: Gw2Infusion } = proxyquire('./', {
  'react-redux': { connect: () => (Component) => Component },
});

describe('<Gw2Infusion />', () => {
  const noop = () => {};

  it('should fetch on mount', () => {
    const fetch = sinon.spy();

    shallow(<Gw2Infusion id={23} fetch={fetch} />, {
      lifecycleExperimental: true,
    });

    expect(fetch).to.have.been.calledWith([23]);
  });

  it('should fetch on update', () => {
    const fetch = sinon.spy();
    const wrapper = shallow(<Gw2Infusion id={23} fetch={fetch} />);

    wrapper.setProps({
      id: 25,
    });

    expect(fetch).to.have.been.calledWith([25]);
  });

  it('should render placeholder when id and no data', () => {
    const wrapper = shallow(<Gw2Infusion fetch={noop} id={23} />);

    expect(wrapper.find('PlaceholderInfusion')).to.exist;
  });

  it('should render infusion when no id', () => {
    const wrapper = shallow(<Gw2Infusion />);

    expect(wrapper.find('Infusion')).to.exist;
  });

  it('should render infusion when data', () => {
    const wrapper = shallow(<Gw2Infusion data={{}} />);

    expect(wrapper.find('Infusion')).to.exist;
  });

  it('should render placeholder when error', () => {
    const wrapper = shallow(<Gw2Infusion fetch={noop} data={{ error: true }} id={23} />);

    expect(wrapper.find('PlaceholderInfusion')).to.exist;
  });
});
