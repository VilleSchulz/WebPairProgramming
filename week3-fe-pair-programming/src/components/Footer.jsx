import PageLinks from './PageLinks'
import SocialLinks from './SocialLinks'

function Footer() {
  return (
<footer className="section footer">
  <PageLinks parentClass='footer-links' itemClass='footer-link' />
  < SocialLinks parentClass ='footer-icons' itemClass = 'footer-icon'/>
</footer>

  );
}

export default Footer;
