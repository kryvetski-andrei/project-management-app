import { Check, Language } from '@mui/icons-material';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { LanguageActionTypes, LanguageName, LANGUAGES_LIST } from '../../../utils/types/languages';

function LanguageMenu({ dark }: { dark?: boolean }): ReactElement {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const currentLang = useTypedSelector((state) => state.lang.current);
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);

  function handleClick(event: React.MouseEvent<HTMLElement>): void {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(): void {
    setAnchorEl(null);
  }

  function changeLang(lang: LanguageName): void {
    dispatch({ type: LanguageActionTypes.SET_CURRENT, payload: lang });
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2, color: dark ? 'gray' : 'black' }}
        aria-controls={open ? 'profile-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Language color="inherit" sx={{ width: 32, height: 32 }}></Language>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="profile-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {LANGUAGES_LIST.map((lang) => (
          <MenuItem key={lang}>
            {lang === currentLang ? (
              <>
                <ListItemIcon>
                  <Check />
                </ListItemIcon>
                <ListItemText onClick={() => changeLang(lang)}>{lang}</ListItemText>
              </>
            ) : (
              <ListItemText onClick={() => changeLang(lang)} inset>
                {lang}
              </ListItemText>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default LanguageMenu;
