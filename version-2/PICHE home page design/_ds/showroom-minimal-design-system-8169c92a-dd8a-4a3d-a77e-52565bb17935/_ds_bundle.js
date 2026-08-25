/* @ds-bundle: {"format":4,"namespace":"ShowroomMinimalDesignSystem_8169c9","components":[{"name":"CategoryCard","sourcePath":"components/cards/CategoryCard.jsx"},{"name":"VehicleCard","sourcePath":"components/cards/VehicleCard.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"NavButton","sourcePath":"components/core/NavButton.jsx"},{"name":"TextLink","sourcePath":"components/core/TextLink.jsx"},{"name":"Carousel","sourcePath":"components/media/Carousel.jsx"},{"name":"HeroSection","sourcePath":"components/media/HeroSection.jsx"},{"name":"Photo","sourcePath":"components/media/Photo.jsx"},{"name":"ChatBar","sourcePath":"components/navigation/ChatBar.jsx"},{"name":"NavPanel","sourcePath":"components/navigation/NavPanel.jsx"},{"name":"SiteHeader","sourcePath":"components/navigation/SiteHeader.jsx"}],"sourceHashes":{"components/cards/CategoryCard.jsx":"2b87315effad","components/cards/VehicleCard.jsx":"377078aa9984","components/core/Button.jsx":"6c20a94d4093","components/core/Input.jsx":"260a0ad45925","components/core/NavButton.jsx":"7f08a6dc5d0e","components/core/TextLink.jsx":"663e510223d8","components/media/Carousel.jsx":"63fa555a7e81","components/media/HeroSection.jsx":"3ffba45d8b43","components/media/Photo.jsx":"98ded61f8c95","components/navigation/ChatBar.jsx":"ab87fbaad723","components/navigation/NavPanel.jsx":"bb9c1c83c2a7","components/navigation/SiteHeader.jsx":"5dc4c346b375","ui_kits/piche/Chrome.jsx":"f74456241808","ui_kits/piche/Home.jsx":"e66e0dc1299d","ui_kits/piche/Pages.jsx":"12015e1c26cf","ui_kits/piche/ProjectPage.jsx":"4b8478a1ba0f","ui_kits/piche/Selector.jsx":"de84a94dcedb","ui_kits/showroom-site/BrowseScreen.jsx":"4518a28d56c8","ui_kits/showroom-site/HomeScreen.jsx":"d4b178aeb947","ui_kits/showroom-site/SiteChrome.jsx":"6020b86de4ae"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ShowroomMinimalDesignSystem_8169c9 = window.ShowroomMinimalDesignSystem_8169c9 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Button({
  variant = 'primary',
  children,
  width,
  disabled,
  onClick,
  style,
  ...rest
}) {
  const base = {
    font: 'var(--type-button-weight) var(--type-button-size)/var(--type-button-lh) var(--font-text)',
    borderRadius: 'var(--radius-control)',
    minHeight: 'var(--cta-height)',
    width: width || 'var(--cta-width)',
    padding: 'var(--pad-button)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '3px solid transparent',
    boxShadow: 'rgba(0,0,0,0) 0px 0px 0px 2px inset',
    transition: 'var(--transition-control)',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    letterSpacing: 'var(--letter-spacing)'
  };
  const variants = {
    primary: {
      background: 'var(--action-primary)',
      color: 'var(--text-on-accent)'
    },
    secondary: {
      background: 'var(--action-secondary-bg)',
      color: 'var(--action-secondary-text)'
    },
    'secondary-translucent': {
      background: 'rgba(255,255,255,0.65)',
      color: 'var(--action-secondary-text)'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onClick: onClick,
    style: {
      ...base,
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  placeholder,
  value,
  onChange,
  bordered = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("input", _extends({
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    style: {
      font: 'var(--type-body-weight) var(--type-body-size)/var(--type-body-lh) var(--font-text)',
      color: 'var(--text-heading)',
      background: 'transparent',
      border: bordered ? '1px solid var(--border-ui)' : 'none',
      borderRadius: 'var(--radius-control)',
      minHeight: 'var(--cta-height)',
      padding: '0 var(--space-2)',
      outline: 'none',
      transition: 'var(--transition-control)',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/NavButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function NavButton({
  children,
  active,
  onClick,
  onMouseEnter,
  tone = 'dark',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    onMouseEnter: onMouseEnter,
    style: {
      font: 'var(--type-nav-weight) var(--type-nav-size)/var(--type-nav-lh) var(--font-text)',
      color: tone === 'light' ? 'var(--text-on-dark)' : 'var(--action-nav-text)',
      background: active ? 'var(--action-nav-hover-bg)' : 'transparent',
      border: 'none',
      borderRadius: 'var(--radius-control)',
      padding: 'var(--pad-nav)',
      minHeight: 'var(--nav-item-height)',
      transition: 'var(--transition-nav)',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { NavButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/NavButton.jsx", error: String((e && e.message) || e) }); }

// components/core/TextLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TextLink({
  children,
  href = '#',
  weight,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      font: (weight || 'var(--type-sublink-weight)') + ' var(--type-sublink-size)/var(--type-sublink-lh) var(--font-text)',
      color: hover ? 'var(--text-heading)' : 'var(--text-tertiary)',
      textDecoration: hover ? 'underline' : 'none',
      transition: 'var(--transition-link)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { TextLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/TextLink.jsx", error: String((e && e.message) || e) }); }

// components/media/Carousel.jsx
try { (() => {
function Carousel({
  count,
  index = 0,
  onChange,
  children,
  style
}) {
  const n = count || React.Children.count(children);
  const go = i => onChange && onChange((i + n) % n);
  const arrow = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 44,
    height: 44,
    borderRadius: 'var(--radius-control)',
    border: 'none',
    background: 'rgba(255,255,255,0.65)',
    color: 'var(--carbon-dark)',
    cursor: 'pointer',
    transition: 'var(--transition-control)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    font: '500 18px/1 var(--font-text)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '100%',
      ...style
    }
  }, React.Children.toArray(children)[index], n > 1 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Previous",
    onClick: () => go(index - 1),
    style: {
      ...arrow,
      left: 'var(--space-2)'
    }
  }, "\u2039"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Next",
    onClick: () => go(index + 1),
    style: {
      ...arrow,
      right: 'var(--space-2)'
    }
  }, "\u203A"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 'var(--space-4)',
      left: 0,
      right: 0,
      display: 'flex',
      gap: 'var(--space-1)',
      justifyContent: 'center'
    }
  }, Array.from({
    length: n
  }).map((_, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    type: "button",
    "aria-label": 'Slide ' + (i + 1),
    onClick: () => go(i),
    style: {
      width: 8,
      height: 8,
      padding: 0,
      border: 'none',
      borderRadius: 'var(--radius-round)',
      background: i === index ? 'var(--white)' : 'rgba(255,255,255,0.4)',
      cursor: 'pointer',
      transition: 'var(--transition-control)'
    }
  })))));
}
Object.assign(__ds_scope, { Carousel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/Carousel.jsx", error: String((e && e.message) || e) }); }

// components/media/Photo.jsx
try { (() => {
function Photo({
  src,
  alt = '',
  label = 'photography',
  ratio = '16 / 9',
  tone = 'light',
  style
}) {
  const box = {
    width: '100%',
    aspectRatio: ratio,
    borderRadius: 'var(--radius-none)',
    overflow: 'hidden',
    ...style
  };
  if (src) return /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      ...box,
      objectFit: 'cover',
      display: 'block'
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...box,
      background: tone === 'dark' ? 'var(--carbon-dark)' : 'var(--light-ash)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-weight) var(--type-body-size)/var(--type-body-lh) var(--font-text)',
      color: tone === 'dark' ? 'var(--pewter)' : 'var(--silver-fog)'
    }
  }, label));
}
Object.assign(__ds_scope, { Photo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/Photo.jsx", error: String((e && e.message) || e) }); }

// components/cards/CategoryCard.jsx
try { (() => {
function CategoryCard({
  label,
  image,
  height = 320,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-card)',
      overflow: 'hidden',
      height,
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Photo, {
    src: image,
    label: "landscape photography",
    style: {
      position: 'absolute',
      inset: 0,
      height: '100%',
      borderRadius: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 'var(--space-3)',
      left: 'var(--space-3)',
      font: 'var(--type-category-weight) var(--type-category-size)/var(--type-category-lh) var(--font-text)',
      color: 'var(--text-on-dark)'
    }
  }, label));
}
Object.assign(__ds_scope, { CategoryCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/CategoryCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/VehicleCard.jsx
try { (() => {
function VehicleCard({
  name,
  image,
  links = ['Learn', 'Order'],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-1)',
      background: 'transparent',
      border: 'none',
      boxShadow: 'var(--elevation-flat)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Photo, {
    src: image,
    label: "product render",
    ratio: "16 / 9",
    style: {
      width: '100%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-product-weight) var(--type-product-size)/var(--type-product-lh) var(--font-text)',
      color: 'var(--text-heading)'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)'
    }
  }, links.map(l => /*#__PURE__*/React.createElement(__ds_scope.TextLink, {
    key: l
  }, l))));
}
Object.assign(__ds_scope, { VehicleCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/VehicleCard.jsx", error: String((e && e.message) || e) }); }

// components/media/HeroSection.jsx
try { (() => {
function HeroSection({
  title,
  promo,
  image,
  children,
  height = '100vh',
  align = 'top',
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      height,
      width: '100%',
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Photo, {
    src: image,
    tone: "dark",
    label: "full-bleed hero photography",
    style: {
      position: 'absolute',
      inset: 0,
      height: '100%',
      aspectRatio: 'auto'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      boxSizing: 'border-box',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: align === 'top' ? 'flex-start' : 'space-between',
      paddingTop: 'var(--space-6)',
      paddingBottom: 'calc(var(--space-6) + var(--space-4))',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: 'var(--type-hero-weight) var(--type-hero-size)/var(--type-hero-lh) var(--font-display)',
      color: 'var(--text-on-dark)',
      letterSpacing: 'var(--letter-spacing)'
    }
  }, title), promo && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 'var(--space-2) 0 0',
      font: 'var(--type-promo-weight) var(--type-promo-size)/1.2 var(--font-text)',
      color: 'var(--text-on-dark)'
    }
  }, promo)), children && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      justifyContent: 'center',
      marginTop: 'auto'
    }
  }, children)));
}
Object.assign(__ds_scope, { HeroSection });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/HeroSection.jsx", error: String((e && e.message) || e) }); }

// components/navigation/ChatBar.jsx
try { (() => {
function ChatBar({
  label = 'Ask a Question',
  placeholder = "What's included in the warranty?",
  ctaLabel = 'Schedule a Drive Today',
  onSend,
  style
}) {
  const [value, setValue] = React.useState('');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      bottom: 0,
      zIndex: 'var(--z-chatbar)',
      background: 'var(--surface-page)',
      borderTop: '1px solid var(--border-divider)',
      padding: 'var(--space-1) var(--space-3)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://unpkg.com/lucide-static@0.544.0/icons/message-circle.svg",
    alt: "",
    width: "18",
    height: "18",
    style: {
      opacity: 0.8
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-nav-weight) var(--type-nav-size)/var(--type-nav-lh) var(--font-text)',
      color: 'var(--text-heading)'
    }
  }, label), /*#__PURE__*/React.createElement(__ds_scope.Input, {
    bordered: false,
    value: value,
    placeholder: placeholder,
    onChange: e => setValue(e.target.value),
    style: {
      flex: 1,
      minWidth: 0
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Send",
    onClick: () => {
      onSend && onSend(value);
      setValue('');
    },
    style: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: 'var(--space-half)',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://unpkg.com/lucide-static@0.544.0/icons/arrow-up.svg",
    alt: "",
    width: "18",
    height: "18"
  })), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    width: "auto",
    style: {
      padding: '0 var(--space-2)',
      gap: 'var(--space-1)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://unpkg.com/lucide-static@0.544.0/icons/calendar.svg",
    alt: "",
    width: "16",
    height: "16"
  }), ctaLabel));
}
Object.assign(__ds_scope, { ChatBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/ChatBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavPanel.jsx
try { (() => {
function NavPanel({
  open,
  children,
  links = [],
  style
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-page)',
      border: 'none',
      boxShadow: 'var(--elevation-flat)',
      padding: 'var(--space-4) var(--space-3)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '7fr 3fr',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--space-4)'
    }
  }, children), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
      alignItems: 'flex-start'
    }
  }, links.map(l => /*#__PURE__*/React.createElement(__ds_scope.TextLink, {
    key: l
  }, l)))));
}
Object.assign(__ds_scope, { NavPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavPanel.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteHeader.jsx
try { (() => {
function SiteHeader({
  wordmark = 'SHOWROOM',
  items = [],
  active,
  onSelect,
  tone = 'dark',
  frosted,
  style,
  children
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 'var(--z-nav)',
      background: frosted ? 'var(--surface-frost)' : tone === 'light' ? 'transparent' : 'var(--surface-page)',
      backdropFilter: frosted ? 'var(--blur-frost)' : 'none',
      border: 'none',
      boxShadow: 'var(--elevation-flat)',
      transition: 'var(--transition-nav)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center',
      padding: 'var(--space-1) var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 15px/1 var(--font-display)',
      letterSpacing: '0.32em',
      color: tone === 'light' ? 'var(--text-on-dark)' : 'var(--text-heading)'
    }
  }, wordmark), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 'var(--space-half)'
    }
  }, items.map(it => /*#__PURE__*/React.createElement(__ds_scope.NavButton, {
    key: it,
    tone: tone,
    active: active === it,
    onClick: () => onSelect && onSelect(active === it ? null : it)
  }, it))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-half)',
      justifyContent: 'flex-end'
    }
  }, children)));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/piche/Chrome.jsx
try { (() => {
function Ph({
  label,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ph",
    style: style
  }, label);
}
function Header({
  route,
  go
}) {
  const nav = [['projects', 'projects'], ['about', 'abot us'], ['news', 'news'], ['contacts', 'contacts']];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(255,255,255,.92)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--p-line)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      height: 72
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => go('home'),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      display: 'flex'
    },
    "aria-label": "PICHE"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/piche-logo-stacked.png",
    alt: "PICHE",
    style: {
      height: 34,
      width: 'auto'
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 22,
      marginLeft: 8
    }
  }, nav.map(([id, label]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => go(id === 'projects' ? 'home' : id),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      font: '600 14px var(--p-font-body)',
      color: route === id ? 'var(--p-ink)' : 'var(--p-ink-2)',
      borderBottom: route === id ? '2px solid var(--p-accent)' : '2px solid transparent',
      padding: '4px 0'
    }
  }, label))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      border: '1px solid var(--p-line)',
      borderRadius: 'var(--p-r-pill)',
      padding: '8px 14px',
      minWidth: 210
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://unpkg.com/lucide-static@0.544.0/icons/search.svg",
    width: "16",
    height: "16",
    alt: ""
  }), /*#__PURE__*/React.createElement("input", {
    className: "field",
    placeholder: "search bar",
    style: {
      border: 'none',
      padding: 0,
      fontSize: 14
    }
  })), /*#__PURE__*/React.createElement(LangSwitch, null), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => go('contacts')
  }, "apply now"))));
}
function LangSwitch() {
  const [l, setL] = React.useState('EN');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 2
    }
  }, ['LV', 'EN', 'RU'].map(x => /*#__PURE__*/React.createElement("button", {
    key: x,
    onClick: () => setL(x),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      font: '600 13px var(--p-font-body)',
      color: l === x ? 'var(--p-ink)' : 'var(--p-ink-3)'
    }
  }, x)));
}
function ContactForm({
  compact
}) {
  const [sent, setSent] = React.useState(false);
  const fields = ['Name', 'Surname', 'Telephone number', 'E-mail'];
  if (sent) return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      background: 'var(--p-sand)',
      borderRadius: 'var(--p-r)'
    }
  }, /*#__PURE__*/React.createElement("h3", null, "Thank you"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 6
    }
  }, "Your message has been sent. A sales specialist will contact you."));
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    },
    style: {
      display: 'grid',
      gridTemplateColumns: compact ? '1fr' : '1fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 14
    }
  }, fields.map(p => /*#__PURE__*/React.createElement("input", {
    key: p,
    className: "field",
    placeholder: p
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 14,
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement("textarea", {
    className: "field",
    placeholder: "Your question or comment",
    rows: 4,
    style: {
      border: '1px solid var(--p-line)',
      borderRadius: 'var(--p-r)',
      padding: 12,
      resize: 'none'
    }
  }), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      fontSize: 13,
      color: 'var(--p-ink-3)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    required: true,
    style: {
      marginTop: 3
    }
  }), /*#__PURE__*/React.createElement("span", null, "I agree to the processing of my data in line with the ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      textDecoration: 'underline'
    }
  }, "privacy policy"), ".")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-dark",
    style: {
      justifySelf: 'start'
    }
  }, "Send message")));
}
function Banks() {
  const banks = [['Swedbank', 'https://www.swedbank.lv/private/credit/loans/home'], ['Bigbank', 'https://www.bigbank.lv/privatpersonam/hipotekarais-aizdevums/'], ['ALTUM', 'https://www.altum.lv/en/services/individuals/'], ['Citadele', 'https://www.citadele.lv/lv/private/mortgage/'], ['SEB', 'https://www.seb.lv/privatpersonam/krediti/majokla-kredits'], ['Luminor', 'https://www.luminor.lv/en']];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--p-sand)',
      padding: '56px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("h2", null, "Choose a bank"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8
    }
  }, "Click to view offer"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 1fr)',
      gap: 16,
      marginTop: 28
    }
  }, banks.map(([n, href]) => /*#__PURE__*/React.createElement("a", {
    key: n,
    href: href,
    target: "_blank",
    rel: "noreferrer",
    style: {
      background: '#fff',
      border: '1px solid var(--p-line)',
      borderRadius: 'var(--p-r)',
      height: 76,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: '700 14px var(--p-font-head)'
    }
  }, n))), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 14,
      fontSize: 12,
      color: 'var(--p-ink-3)'
    }
  }, "Bank logos to be supplied by the client \u2014 names shown as plain type placeholders.")));
}
function Footer({
  go
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--p-ink)',
      color: '#fff',
      padding: '56px 0 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/piche-logo-stacked.png",
    alt: "PICHE",
    style: {
      height: 34,
      width: 'auto'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12,
      color: '#A8AEB5',
      maxWidth: 260
    }
  }, "Real estate developer in Latvia \u2013 modern apartments, flats and homes.")), [['Projects', ['Priežu Rezidences row houses', 'Priežu Rezidences apartments', 'Mežaparka rezidences']], ['Company', ['abot us', 'news', 'contacts', 'piche.eu']], ['Legal', ['Privacy policy', 'Cookies', 'Terms']]].map(([t, items]) => /*#__PURE__*/React.createElement("div", {
    key: t
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      color: '#7A8189'
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 8,
      marginTop: 12
    }
  }, items.map(i => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    onClick: e => {
      e.preventDefault();
      go(t === 'Projects' ? 'project' : 'about');
    },
    style: {
      color: '#E4E6E8',
      fontSize: 14
    }
  }, i)))))), /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      marginTop: 40,
      paddingTop: 20,
      borderTop: '1px solid #2A2E34',
      display: 'flex',
      justifyContent: 'space-between',
      color: '#7A8189',
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 PICHE"), /*#__PURE__*/React.createElement("span", null, "LV / EN / RU")));
}
Object.assign(window, {
  Ph,
  Header,
  LangSwitch,
  ContactForm,
  Banks,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/piche/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/piche/Home.jsx
try { (() => {
function Home({
  go
}) {
  const projects = [{
    name: 'Priežu Rezidences row houses',
    loc: 'MĀRUPE',
    status: 'Available'
  }, {
    name: 'Priežu Rezidences apartments',
    loc: 'MĀRUPE',
    status: 'Available'
  }, {
    name: 'Mežaparka rezidences',
    loc: 'RĪGA',
    status: 'Coming soon'
  }, {
    name: 'Krūmiņsala 29',
    loc: 'MĀRUPE',
    status: 'Coming soon'
  }];
  const news = ['Priežu Rezidences apartments — construction update', 'Two show apartments now open for viewings', 'Energy efficiency: what triple glazing actually saves'];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      height: 620
    }
  }, /*#__PURE__*/React.createElement(Ph, {
    label: "intro video \u2014 all of our projects in one video",
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--p-sand-2)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      position: 'relative',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      paddingBottom: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 860,
      background: 'rgba(255,255,255,.9)',
      borderRadius: 'var(--p-r-lg)',
      padding: 32
    }
  }, /*#__PURE__*/React.createElement("h1", null, "New Apartments for Sale \u2013 Energy-Efficient Homes in a Modern Living Environment"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 16,
      fontSize: 17,
      maxWidth: 680
    }
  }, "Choose your home in new developments across R\u012Bga, M\u0101rupe and the surrounding areas"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => go('project')
  }, "View projects"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: () => go('contacts')
  }, "Book a viewing"))))), /*#__PURE__*/React.createElement("section", {
    className: "wrap",
    style: {
      padding: '72px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("h2", null, "Our projects"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--p-ink-3)',
      fontSize: 13
    }
  }, "project name : location : picture")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 24,
      marginTop: 28
    }
  }, projects.map(p => /*#__PURE__*/React.createElement("button", {
    key: p.name,
    onClick: () => go('project'),
    style: {
      textAlign: 'left',
      background: '#fff',
      border: '1px solid var(--p-line)',
      borderRadius: 'var(--p-r-lg)',
      overflow: 'hidden',
      padding: 0,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Ph, {
    label: "project picture",
    style: {
      height: 260
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 16,
      left: 16,
      background: 'rgba(20,22,26,.82)',
      color: '#fff',
      borderRadius: 'var(--p-r-pill)',
      padding: '6px 14px',
      fontSize: 12,
      fontWeight: 600
    }
  }, p.status)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 22px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, p.loc), /*#__PURE__*/React.createElement("h3", {
    style: {
      marginTop: 8
    }
  }, p.name)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--p-sand)',
      padding: '64px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 40,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ph, {
    label: "show apartment visualisation",
    style: {
      height: 300,
      borderRadius: 'var(--p-r-lg)',
      background: 'var(--p-sand-2)'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Price list"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 10,
      fontSize: 17
    }
  }, "Find out available houses and their costs"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      marginTop: 22
    },
    onClick: () => go('project')
  }, "price list here")))), /*#__PURE__*/React.createElement("section", {
    className: "wrap",
    style: {
      padding: '72px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("h2", null, "News"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, "All news \u2192")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8,
      color: 'var(--p-ink-3)',
      fontSize: 13
    }
  }, "news section \u2014 transfer of existing news from priezurezidences.lv and dizozoli.lv"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 24,
      marginTop: 24
    }
  }, news.map(n => /*#__PURE__*/React.createElement("article", {
    key: n
  }, /*#__PURE__*/React.createElement(Ph, {
    label: "news image",
    style: {
      height: 180,
      borderRadius: 'var(--p-r)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      marginTop: 14
    }
  }, "AUG 2026"), /*#__PURE__*/React.createElement("h3", {
    style: {
      marginTop: 6
    }
  }, n))))), /*#__PURE__*/React.createElement("section", {
    style: {
      borderTop: '1px solid var(--p-line)',
      padding: '64px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("h2", null, "Follow our projects"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8,
      color: 'var(--p-ink-3)',
      fontSize: 13
    }
  }, "social media integration \u2014 only posts regarding living projects"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 16,
      marginTop: 24
    }
  }, [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement(Ph, {
    key: i,
    label: "social post",
    style: {
      aspectRatio: '1 / 1',
      borderRadius: 'var(--p-r)'
    }
  }))))), /*#__PURE__*/React.createElement(Banks, null), /*#__PURE__*/React.createElement("section", {
    className: "wrap",
    style: {
      padding: '72px 32px'
    }
  }, /*#__PURE__*/React.createElement("h2", null, "Get in touch"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(ContactForm, null))));
}
window.Home = Home;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/piche/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/piche/Pages.jsx
try { (() => {
function About() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      height: 420
    }
  }, /*#__PURE__*/React.createElement(Ph, {
    label: "same video as in home page",
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--p-sand-2)'
    }
  })), /*#__PURE__*/React.createElement("section", {
    className: "wrap",
    style: {
      padding: '64px 32px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 48
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 44
    }
  }, "About us"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 16,
      fontSize: 24
    }
  }, "Real estate developer in Latvia \u2013 modern apartments, flats and homes")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("a", {
    href: "https://piche.eu",
    target: "_blank",
    rel: "noreferrer",
    style: {
      textDecoration: 'underline',
      fontWeight: 600
    }
  }, "PICHE"), " is a leading real estate developer in Latvia with more than 20 years of experience, offering high-quality apartments, flats, and homes for modern living. The company specializes not only in residential development, but also in the design, construction, and management of business parks, industrial buildings, warehouses, logistics and production facilities, office spaces, apartment buildings, and row houses."), /*#__PURE__*/React.createElement("p", null, "PICHE\u2019s portfolio includes more than 200 designed and developed buildings with a total area exceeding 6 million m\xB2."), /*#__PURE__*/React.createElement("p", null, "The company\u2019s team consists of more than 300 professionals \u2013 architects, designers, engineers, IT specialists, project managers, and construction experts \u2013 ensuring full-cycle real estate development in Latvia."))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--p-sand)',
      padding: '56px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 32
    }
  }, [['20+', 'years of experience'], ['200+', 'buildings developed'], ['300+', 'professionals']].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: n
  }, /*#__PURE__*/React.createElement("div", {
    className: "head",
    style: {
      fontSize: 46,
      fontWeight: 800
    }
  }, n), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 6
    }
  }, l))))));
}
function Contacts() {
  const people = [{
    n: 'V ā r d s  U z v ā r d s',
    p: '+ 3 7 1  2 2  3 3 3  3 3 3 3',
    e: 'e - m a i l'
  }, {
    n: 'V ā r d s  U z v ā r d s',
    p: '+ 3 7 1  2 2  3 3 3  3 3 3 3',
    e: 'e - m a i l'
  }];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      height: 320
    }
  }, /*#__PURE__*/React.createElement(Ph, {
    label: "same video as in home page",
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--p-sand-2)'
    }
  })), /*#__PURE__*/React.createElement("section", {
    className: "wrap",
    style: {
      padding: '64px 32px'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 44
    }
  }, "Contacts"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1.2fr',
      gap: 40,
      marginTop: 36,
      alignItems: 'start'
    }
  }, people.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement(Ph, {
    label: "portrait",
    style: {
      height: 240,
      borderRadius: 'var(--p-r)'
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      marginTop: 16
    }
  }, p.n), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 6,
      color: 'var(--p-ink-3)'
    }
  }, "Sales and leasing"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 6,
      marginTop: 12,
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", null, p.p), /*#__PURE__*/React.createElement("span", null, p.e)))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: '1px solid var(--p-line)',
      paddingLeft: 32
    }
  }, /*#__PURE__*/React.createElement(ContactForm, {
    compact: true
  })))), /*#__PURE__*/React.createElement(Banks, null));
}
function News() {
  return /*#__PURE__*/React.createElement("section", {
    className: "wrap",
    style: {
      padding: '64px 32px'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 44
    }
  }, "News"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 10,
      color: 'var(--p-ink-3)'
    }
  }, "Transfer of existing news from priezurezidences.lv and dizozoli.lv."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 24,
      marginTop: 32
    }
  }, [1, 2, 3, 4, 5, 6].map(i => /*#__PURE__*/React.createElement("article", {
    key: i
  }, /*#__PURE__*/React.createElement(Ph, {
    label: "news image",
    style: {
      height: 180,
      borderRadius: 'var(--p-r)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      marginTop: 14
    }
  }, "AUG 2026"), /*#__PURE__*/React.createElement("h3", {
    style: {
      marginTop: 6
    }
  }, "Article title placeholder ", i)))));
}
Object.assign(window, {
  About,
  Contacts,
  News
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/piche/Pages.jsx", error: String((e && e.message) || e) }); }

// ui_kits/piche/ProjectPage.jsx
try { (() => {
function ProjectPage({
  go
}) {
  const [shot, setShot] = React.useState(0);
  const advantages = ['Elegant glass facades built to last', 'Smart home technology controlled via phone', 'Wireless switches uniquely designed in-house', 'Smart access via fingerprint recognition', 'Digital skirting boards with led light', 'Apartments built in forest'];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      height: 560
    }
  }, /*#__PURE__*/React.createElement(Ph, {
    label: "project hero visualisation / video",
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--p-sand-2)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 28,
      left: 32
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/piche-logo-stacked.png",
    alt: "PICHE",
    style: {
      height: 40
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      position: 'relative',
      height: '100%',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      paddingBottom: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(255,255,255,.9)',
      borderRadius: 'var(--p-r-lg)',
      padding: 28,
      maxWidth: 620
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "M\u0100RUPE \xB7 Me\u017Eciema Street"), /*#__PURE__*/React.createElement("h1", {
    style: {
      marginTop: 10,
      fontSize: 44
    }
  }, "Prie\u017Eu Rezidences apartments")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      padding: '16px 32px',
      fontSize: 15
    },
    onClick: () => go('contacts')
  }, "apply now"))), /*#__PURE__*/React.createElement("section", {
    className: "wrap",
    style: {
      padding: '72px 32px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 48,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Ph, {
    label: 'project visualisation ' + (shot + 1) + ' / 5',
    style: {
      height: 380,
      borderRadius: 'var(--p-r-lg)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "pill",
    onClick: () => setShot((shot + 4) % 5)
  }, "\u2190"), /*#__PURE__*/React.createElement("button", {
    className: "pill",
    onClick: () => setShot((shot + 1) % 5)
  }, "\u2192"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginLeft: 8
    }
  }, [0, 1, 2, 3, 4].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    onClick: () => setShot(i),
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: i === shot ? 'var(--p-accent)' : 'var(--p-line)',
      cursor: 'pointer'
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("h2", null, "New residential project in M\u0101rupe \u2013 apartments for sale near Riga"), /*#__PURE__*/React.createElement("p", null, "Prie\u017Eu Reziden\u010Du Apartamenti is a new, modern apartment development located on Me\u017Eciema Street in M\u0101rupe. The landscaped area is set within a pine forest, featuring a basketball court and children\u2019s playground equipment for active recreation. Nearby, there is a lake and nature trails, while Riga city center is just a 15-minute drive away."), /*#__PURE__*/React.createElement("p", null, "The project offers apartments for sale near Riga \u2013 including studio, one-bedroom, two-bedroom, and three-bedroom aapartments, as well as penthouse units with four-bedrooms. The apartments are equipped with underfloor heating, smart access via fingerprint recognition, and high energy-efficiency triple-glazed windows with 7-chamber frames and low-emissivity coating, ensuring that apartments stay cool in summer and retain heat during winter."))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--p-sand)',
      padding: '64px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("h2", null, "Advantages you won't find elsewhere"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 24,
      marginTop: 28
    }
  }, advantages.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: a,
    style: {
      background: '#fff',
      border: '1px solid var(--p-line)',
      borderRadius: 'var(--p-r)',
      padding: 24,
      display: 'grid',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 13px var(--p-font-head)',
      color: 'var(--p-accent)'
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("h3", null, a)))))), /*#__PURE__*/React.createElement(Selector, {
    onApply: () => go('contacts')
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--p-ink)',
      color: '#fff',
      padding: '64px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 48,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      color: '#fff'
    }
  }, "Price list"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 10,
      fontSize: 17,
      color: '#C9CED3'
    }
  }, "Find out available houses and their costs"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      marginTop: 22
    }
  }, "price list here")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      color: '#7A8189'
    }
  }, "Location & surroundings"), /*#__PURE__*/React.createElement(Ph, {
    label: "map \u2014 Me\u017Eciema Street, M\u0101rupe",
    style: {
      height: 200,
      borderRadius: 'var(--p-r)',
      background: '#22262C',
      color: '#7A8189'
    }
  })))), /*#__PURE__*/React.createElement(Banks, null), /*#__PURE__*/React.createElement("section", {
    className: "wrap",
    style: {
      padding: '72px 32px'
    }
  }, /*#__PURE__*/React.createElement("h2", null, "apply here"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(ContactForm, null))));
}
window.ProjectPage = ProjectPage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/piche/ProjectPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/piche/Selector.jsx
try { (() => {
const UNITS = (() => {
  const out = [];
  const types = ['Studio', '1-bedroom', '2-bedroom', '3-bedroom', 'Penthouse, 4-bedroom'];
  let n = 1;
  const mix = {
    5: [4, 4, 3, 2, 3, 4],
    4: [0, 1, 2, 3, 2, 1],
    3: [1, 2, 3, 1, 0, 2],
    2: [0, 2, 1, 3, 2, 0],
    1: [1, 0, 2, 1, 3, 2]
  };
  for (let floor = 1; floor <= 5; floor++) {
    for (let i = 0; i < 6; i++) {
      const k = mix[floor][i];
      const base = [31.4, 44.8, 58.2, 74.6, 112.5][k];
      const area = Math.round((base + i * 1.7 + floor * 0.9) * 10) / 10;
      const status = n % 7 === 0 ? 'Sold' : n % 5 === 0 ? 'Reserved' : 'Available';
      out.push({
        id: 'A' + (floor * 100 + i + 1),
        floor,
        type: types[k],
        rooms: k === 4 ? 4 : k + 1,
        area,
        price: Math.round((area * 2650 + floor * 4200 + i * 950) / 10) * 10,
        status,
        building: 'Building 1'
      });
      n++;
    }
  }
  return out;
})();
const STATUS_COLOR = {
  Available: 'var(--p-available)',
  Reserved: 'var(--p-reserved)',
  Sold: 'var(--p-sold)'
};
function StatusTag({
  s
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "status",
    style: {
      color: STATUS_COLOR[s]
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      background: STATUS_COLOR[s]
    }
  }), s);
}
function Selector({
  onApply
}) {
  const [building, setBuilding] = React.useState('Building 1');
  const [floor, setFloor] = React.useState(3);
  const [unit, setUnit] = React.useState(null);
  const [filter, setFilter] = React.useState('All');
  const floors = [5, 4, 3, 2, 1];
  const onFloor = UNITS.filter(u => u.floor === floor);
  const list = UNITS.filter(u => filter === 'All' || u.status === filter);
  return /*#__PURE__*/React.createElement("section", {
    className: "wrap",
    style: {
      padding: '72px 32px'
    }
  }, /*#__PURE__*/React.createElement("h2", null, "Choose your home"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8,
      color: 'var(--p-ink-3)',
      fontSize: 13
    }
  }, "building \u2192 floor \u2192 apartment. Rotatable 3D model and 360\xB0 tour slot in here once the architects' materials are supplied."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      border: '1px solid var(--p-line)',
      borderRadius: 'var(--p-r-lg)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Ph, {
    label: "rotatable building visualisation / 3D model",
    style: {
      height: 380,
      background: 'var(--p-sand-2)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 20,
      left: 0,
      right: 0,
      display: 'flex',
      gap: 10,
      justifyContent: 'center'
    }
  }, ['Building 1', 'Building 2', '360° tour'].map(b => /*#__PURE__*/React.createElement("button", {
    key: b,
    className: "pill",
    "data-on": building === b ? '1' : '0',
    onClick: () => setBuilding(b)
  }, b))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      display: 'flex',
      gap: 8,
      justifyContent: 'center'
    }
  }, floors.map(fl => /*#__PURE__*/React.createElement("button", {
    key: fl,
    className: "pill",
    "data-on": floor === fl ? '1' : '0',
    onClick: () => {
      setFloor(fl);
      setUnit(null);
    }
  }, "Floor ", fl)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr',
      borderTop: '1px solid var(--p-line)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "Floor ", floor, " plan \u2014 ", building), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(6,1fr)',
      gap: 10,
      marginTop: 16
    }
  }, onFloor.map(u => {
    const sel = unit && unit.id === u.id;
    return /*#__PURE__*/React.createElement("button", {
      key: u.id,
      onClick: () => u.status !== 'Sold' && setUnit(u),
      title: u.id,
      style: {
        cursor: u.status === 'Sold' ? 'not-allowed' : 'pointer',
        border: '1px solid ' + (sel ? 'var(--p-ink)' : 'var(--p-line)'),
        background: sel ? 'var(--p-sand-2)' : u.status === 'Sold' ? '#F6F7F8' : '#fff',
        borderRadius: 8,
        padding: '18px 8px',
        display: 'grid',
        gap: 6,
        justifyItems: 'center',
        transition: 'background-color .25s, border-color .25s'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: '700 13px var(--p-font-head)',
        color: 'var(--p-ink)'
      }
    }, u.id), /*#__PURE__*/React.createElement("span", {
      className: "dot",
      style: {
        background: STATUS_COLOR[u.status]
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: 'var(--p-ink-3)'
      }
    }, u.area, " m\xB2"));
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 14,
      fontSize: 12,
      color: 'var(--p-ink-3)'
    }
  }, "Schematic stand-in \u2014 the production plan is the architects' SVG, where every unit shape carries a stable ID bound to the database record.")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      background: 'var(--p-sand)',
      borderLeft: '1px solid var(--p-line)'
    }
  }, !unit && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("h3", null, "Select an apartment"), /*#__PURE__*/React.createElement("p", null, "Status, area and price are read live from the database.")), unit && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("h3", null, "Apartment ", unit.id), /*#__PURE__*/React.createElement(StatusTag, {
    s: unit.status
  })), /*#__PURE__*/React.createElement(Ph, {
    label: "apartment plan",
    style: {
      height: 150,
      background: '#fff',
      borderRadius: 'var(--p-r)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10,
      fontSize: 14
    }
  }, [['Building', unit.building], ['Floor', unit.floor], ['Type', unit.type], ['Rooms', unit.rooms], ['Area', unit.area + ' m²'], ['Price', '€' + unit.price.toLocaleString('lv-LV')]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--p-ink-3)',
      textTransform: 'uppercase',
      letterSpacing: '.08em'
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      color: 'var(--p-ink)'
    }
  }, v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: onApply
  }, "apply"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost"
  }, "Plan PDF")))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      marginRight: 'auto'
    }
  }, "Available apartments"), ['All', 'Available', 'Reserved', 'Sold'].map(s => /*#__PURE__*/React.createElement("button", {
    key: s,
    className: "pill",
    "data-on": filter === s ? '1' : '0',
    onClick: () => setFilter(s)
  }, s))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      border: '1px solid var(--p-line)',
      borderRadius: 'var(--p-r)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '90px 90px 1.6fr 90px 110px 130px 120px',
      gap: 12,
      padding: '12px 18px',
      background: 'var(--p-sand)',
      fontSize: 11,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--p-ink-3)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Nr."), /*#__PURE__*/React.createElement("span", null, "Floor"), /*#__PURE__*/React.createElement("span", null, "Type"), /*#__PURE__*/React.createElement("span", null, "Rooms"), /*#__PURE__*/React.createElement("span", null, "Area"), /*#__PURE__*/React.createElement("span", null, "Price"), /*#__PURE__*/React.createElement("span", null, "Status")), list.slice(0, 10).map(u => /*#__PURE__*/React.createElement("div", {
    key: u.id,
    onClick: () => {
      setFloor(u.floor);
      setUnit(u);
    },
    style: {
      display: 'grid',
      gridTemplateColumns: '90px 90px 1.6fr 90px 110px 130px 120px',
      gap: 12,
      padding: '14px 18px',
      borderTop: '1px solid var(--p-line)',
      fontSize: 14,
      alignItems: 'center',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: 'var(--p-ink)'
    }
  }, u.id), /*#__PURE__*/React.createElement("span", null, u.floor), /*#__PURE__*/React.createElement("span", null, u.type), /*#__PURE__*/React.createElement("span", null, u.rooms), /*#__PURE__*/React.createElement("span", null, u.area, " m\xB2"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: 'var(--p-ink)'
    }
  }, "\u20AC", u.price.toLocaleString('lv-LV')), /*#__PURE__*/React.createElement(StatusTag, {
    s: u.status
  })))), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12,
      fontSize: 12,
      color: 'var(--p-ink-3)'
    }
  }, "10 of ", list.length, " rows shown. Sales staff change price and status in the admin environment; the change appears here after cache refresh.")));
}
Object.assign(window, {
  Selector,
  StatusTag,
  UNITS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/piche/Selector.jsx", error: String((e && e.message) || e) }); }

// ui_kits/showroom-site/BrowseScreen.jsx
try { (() => {
const {
  CategoryCard,
  Button,
  TextLink,
  Input,
  Photo
} = window.ShowroomMinimalDesignSystem_8169c9;
function BrowseScreen({
  onRoute
}) {
  const rows = [{
    name: 'Sedan',
    trim: 'Long Range',
    price: '$47,490'
  }, {
    name: 'SUV',
    trim: 'All-Wheel Drive',
    price: '$52,990'
  }, {
    name: 'Truck',
    trim: 'Dual Motor',
    price: '$79,990'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '40px 21.44px 64px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: '500 var(--type-hero-size)/var(--type-hero-lh) var(--font-display)',
      color: 'var(--text-heading)'
    }
  }, "Inventory"), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Search by model or location",
    style: {
      width: 280
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--gap-card)',
      marginTop: 'var(--space-4)'
    }
  }, rows.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.name,
    style: {
      display: 'grid',
      gridTemplateColumns: '360px 1fr auto',
      gap: 'var(--space-4)',
      alignItems: 'center',
      paddingBottom: 'var(--space-4)',
      borderBottom: '1px solid var(--border-divider)'
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    ratio: "16 / 9",
    label: "product render"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 var(--type-product-size)/var(--type-product-lh) var(--font-text)',
      color: 'var(--text-heading)'
    }
  }, r.name), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 var(--type-body-size)/var(--type-body-lh) var(--font-text)',
      color: 'var(--text-body)',
      marginTop: 4
    }
  }, r.trim), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      marginTop: 'var(--space-1)'
    }
  }, /*#__PURE__*/React.createElement(TextLink, null, "Learn"), /*#__PURE__*/React.createElement(TextLink, null, "Compare"))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 var(--type-product-size)/var(--type-product-lh) var(--font-text)',
      color: 'var(--text-heading)',
      marginBottom: 'var(--space-1)'
    }
  }, r.price), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    width: "160px",
    onClick: () => onRoute('home')
  }, "Order Now"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-6)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--gap-card)'
    }
  }, /*#__PURE__*/React.createElement(CategoryCard, {
    label: "Pre-Owned",
    height: 260
  }), /*#__PURE__*/React.createElement(CategoryCard, {
    label: "Trade-In",
    height: 260
  })));
}
window.BrowseScreen = BrowseScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/showroom-site/BrowseScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/showroom-site/HomeScreen.jsx
try { (() => {
const {
  Carousel,
  HeroSection,
  Button,
  CategoryCard
} = window.ShowroomMinimalDesignSystem_8169c9;
function HomeScreen({
  onRoute
}) {
  const [i, setI] = React.useState(0);
  const models = [{
    title: 'Sedan',
    promo: '0% APR Available'
  }, {
    title: 'SUV',
    promo: null
  }, {
    title: 'Truck',
    promo: 'Delivery This Quarter'
  }];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '84vh'
    }
  }, /*#__PURE__*/React.createElement(Carousel, {
    index: i,
    onChange: setI
  }, models.map(m => /*#__PURE__*/React.createElement(HeroSection, {
    key: m.title,
    height: "84vh",
    title: m.title,
    promo: m.promo
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => onRoute('browse')
  }, "Order Now"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary-translucent",
    width: "160px",
    onClick: () => onRoute('browse')
  }, "View Inventory"))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '64px 21.44px',
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: 'var(--gap-card)'
    }
  }, /*#__PURE__*/React.createElement(CategoryCard, {
    label: "Sport Sedan",
    height: 380
  }), /*#__PURE__*/React.createElement(CategoryCard, {
    label: "Midsize SUV",
    height: 380
  })));
}
window.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/showroom-site/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/showroom-site/SiteChrome.jsx
try { (() => {
const {
  SiteHeader,
  NavPanel,
  VehicleCard,
  ChatBar
} = window.ShowroomMinimalDesignSystem_8169c9;
function Chrome({
  route,
  onRoute,
  children
}) {
  const [open, setOpen] = React.useState(null);
  const [asked, setAsked] = React.useState(null);
  const icons = ['help-circle', 'globe', 'user'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 100
    },
    onMouseLeave: () => setOpen(null)
  }, /*#__PURE__*/React.createElement(SiteHeader, {
    wordmark: "SHOWROOM",
    items: ['Vehicles', 'Energy', 'Charging', 'Discover', 'Shop'],
    active: open,
    onSelect: setOpen,
    frosted: true
  }, icons.map(n => /*#__PURE__*/React.createElement("button", {
    key: n,
    onClick: () => onRoute(route),
    style: {
      background: 'transparent',
      border: 'none',
      padding: 4,
      cursor: 'pointer',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: 'https://unpkg.com/lucide-static@0.544.0/icons/' + n + '.svg',
    width: "18",
    height: "18",
    alt: n
  })))), /*#__PURE__*/React.createElement(NavPanel, {
    open: !!open,
    links: ['New', 'Pre-Owned', 'Trade-In', 'Demo Drive', 'Compare']
  }, ['Sedan', 'SUV', 'Truck'].map(m => /*#__PURE__*/React.createElement("div", {
    key: m,
    onClick: () => {
      setOpen(null);
      onRoute('browse');
    },
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(VehicleCard, {
    name: m
  }))))), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1
    }
  }, children), asked && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      bottom: 56,
      padding: '12px 21.44px',
      background: 'var(--light-ash)',
      font: '400 14px/20px var(--font-text)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 500,
      color: 'var(--text-heading)'
    }
  }, asked), " \u2014 an answer would appear here."), /*#__PURE__*/React.createElement(ChatBar, {
    onSend: v => setAsked(v || "What's included in the warranty?")
  }));
}
window.Chrome = Chrome;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/showroom-site/SiteChrome.jsx", error: String((e && e.message) || e) }); }

__ds_ns.CategoryCard = __ds_scope.CategoryCard;

__ds_ns.VehicleCard = __ds_scope.VehicleCard;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.NavButton = __ds_scope.NavButton;

__ds_ns.TextLink = __ds_scope.TextLink;

__ds_ns.Carousel = __ds_scope.Carousel;

__ds_ns.HeroSection = __ds_scope.HeroSection;

__ds_ns.Photo = __ds_scope.Photo;

__ds_ns.ChatBar = __ds_scope.ChatBar;

__ds_ns.NavPanel = __ds_scope.NavPanel;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

})();
