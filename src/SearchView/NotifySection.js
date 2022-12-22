
import theme from '../ThemeContext'
import {Link} from 'react-router-dom';
import {Button} from "@mui/material";

export default function NotifySection ({isNotifySectionVisibleValue, notifySectionMessageValue, viewButtonLinkIntermediaryValue }){
  return (
    <section name="NotifySection"
      style={{
        ...styles.NotifySection,
        display: isNotifySectionVisibleValue ? 'flex' : 'none'
      }}
    >
      <h4 style={styles.h4}> {notifySectionMessageValue} </h4>
      <Link style={styles.ViewButtonLink} name="ViewButtonLink" to={viewButtonLinkIntermediaryValue}>
        <Button name="ViewButton"
          variant="contained"
          style={styles.ViewButton}
        > 
          VIEW ITEM 
        </Button>
      </Link>
    </section>
  )
}

var styles = {
  NotifySection: {
    ...theme.card,
    height: '40px',
    maxHeight: '40px',
    padding: '0px',
    paddingTop: '0px',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '6px'
  },
  h4: {
    marginLeft: '8px',
    fontSize: '12px',
    fontFamily: 'Proxima Nova Condensed',
    marginTop: 'auto',
    marginBottom: 'auto',
    alignSelf: 'middle',
    fontWeight: 900
  },
}