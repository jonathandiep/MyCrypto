import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BetaAgreement, Footer, Header } from 'components';
import { AppState } from 'reducers';
import Notifications from './Notifications';
import OfflineTab from './OfflineTab';
import { getOffline, getLatestBlock } from 'selectors/config';
import './WebTemplate.scss';

interface StateProps {
  isOffline: AppState['config']['meta']['offline'];
  latestBlock: AppState['config']['meta']['latestBlock'];
}

interface OwnProps {
  isUnavailableOffline?: boolean;
  children: string | React.ReactElement<string> | React.ReactElement<string>[];
}

type Props = OwnProps & StateProps;

class WebTemplate extends Component<Props, {}> {
  public render() {
    const { isUnavailableOffline, children, isOffline, latestBlock } = this.props;

    return (
      <div className="WebTemplate">
        <Header />
        <div className="Tab container">
          {isUnavailableOffline && isOffline ? <OfflineTab /> : children}
        </div>
        <div className="WebTemplate-spacer" />
        <Footer latestBlock={latestBlock} />
        <Notifications />
        <BetaAgreement />
      </div>
    );
  }
}

function mapStateToProps(state: AppState): StateProps {
  return {
    isOffline: getOffline(state),
    latestBlock: getLatestBlock(state)
  };
}

export default connect(mapStateToProps, {})(WebTemplate);