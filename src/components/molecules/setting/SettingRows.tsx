import styled from 'styled-components';
import SettingRow from './SettingRow';
import Button from '@/components/atoms/Button';
import media from '@/lib/styles/media';
import { AuthUser } from '@/lib/graphql/user';
import { Fragment, useCallback, useEffect, useState } from 'react';
import ToggleSwitch from '@/components/atoms/ToggleSwitch';
import { themedPalette } from '@/lib/styles/themes';
import { updateCategory, updateCountry } from '@/services/AccountService';
import { setLayer } from '@/store/core';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { delay } from '@/lib/utils';
import { allCategories, allCountries } from '@/services/NewsService';
import { MdLanguage } from 'react-icons/md';

export type SettingRowsProps = {
  user: AuthUser;
  updateAuthUser: (user: AuthUser) => void;
};

export type Country = {
  code: string;
  name: string;
};

export type Category = {
  name: string;
};

function SettingRows({
  user,
  updateAuthUser,
}: SettingRowsProps) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [countries, loadCountries] = useState<Country[]>([]);
  const [country, setCountry] = useState<string>(user.country?.code || "global");
  const [categories, loadCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<{
    [key: string]: boolean | undefined;
  }>({ ...user.categories });

  const handleSubmitCountry = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const update = country.length === 2
        ? { "code" : country} 
        : { "name" : country};
      const response = await updateCountry(update);
      if (response) {
        updateAuthUser({...user, country: {...response}});
        setEdit(false);
      } else {   
        setCountry(user.country?.code || "global");
      }
  }, [country, updateAuthUser, user]);

  const handleChangeCountry = useCallback(
    (e: SelectChangeEvent) => {
      e.preventDefault();
      setCountry(e.target.value);
    }, []);

  const handleChangeCategory = useCallback(
    async ({ name, value }: { name: string; value: boolean }) => {
      const update = {[name]: value};
      setCategory((prev) => ({ ...prev,  ...update}));
      const response = await updateCategory(update);
      if (response) {
        updateAuthUser({...user, categories: {...user.categories!, ...response}});
      } else {   
        setCategory((prev) => ({ ...prev,  [name]: !value}));
      }
    },
    [user, updateAuthUser],
  );

  const handleExit = async () => {
    dispatch(setLayer(true));
    await delay(1000);
    window.location.replace("/");
  };

  useEffect(() => {
    (async () => {
      const [countries, categories] = await Promise.all([
        allCountries(), allCategories(),
      ]);
      if (countries) {
        loadCountries(countries);
      }
      if (categories) {
        loadCategories(categories);
      }
    })();
  }, []);

  return (
    <Rows>
      {countries.length > 0 && (
        <SettingRow
          title="Country"
          description="This is the page title that appears in the upper left corner of your personal page."
          editButton={!edit}
          onClickEdit={() => setEdit(true)}
        >
          {edit ? (
            <Form onSubmit={handleSubmitCountry}>
              <Select
                value={country}
                onChange={handleChangeCountry}
                sx={{ 
                  display: `block`,
                  width: `18rem`,
                  background: `${themedPalette.bg_element1}`,
                  color: `${themedPalette.text2}`,
                  outline: `none`,
                  borderRadius: `4px`,
                  "&:focus": {
                    border: `1px solid ${themedPalette.border1}`,
                  }
                }}
              >
                <MenuItem key="global" value="global">
                  <Box sx={{ 
                    display:'flex', 
                    alignItems: 'center', 
                    '& > svg': { width:'1.25rem', mr: 2, flexShrink: 0 } }}>
                    <MdLanguage/>Global
                  </Box>
                </MenuItem>
                {countries.map((c) => (
                  <MenuItem key={c.code} value={c.code}>
                    <Box sx={{ '& > img': { mr: 2, flexShrink: 0 } }}>
                      <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png 2x`}
                        alt={c.name}
                      />
                      {`${c.name}`}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
              <Button type="submit">Update</Button>
            </Form>
          ) : (
            user.country?.code === "global" ? (
              <Box sx={{ 
                display:'flex', 
                alignItems: 'center', 
                '& > svg': { width:'1.25rem', mr: 2, flexShrink: 0 } }}>
                <MdLanguage/>Global
              </Box>
            ) : (
              <Box sx={{ '& > img': { mr: 2, flexShrink: 0 } }}>
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${user.country?.code}.png`}
                  srcSet={`https://flagcdn.com/w40/${user.country?.code}.png 2x`}
                  alt="Country"
                />
                {user.country?.name}
              </Box>
            )
          )}
        </SettingRow> 
      )}
      {categories.length > 0 && (
        <SettingRow 
          title="Categories"
          description="I don't know that what is what??"
        >
          <Rules>
            <ul>
              {categories.map((c) => (
                <Fragment key={c.name}>
                  <li>
                    <span>{c.name.charAt(0).toUpperCase() + c.name.slice(1)}</span>
                    <ToggleSwitch
                      value={category[c.name] || false}
                      name={c.name}
                      onChange={handleChangeCategory}
                    />
                  </li>
                </Fragment>
              ))}
            </ul>
          </Rules>
        </SettingRow>
      )}      
      <div className="button-wrapper">
        <Button 
          size="large" 
          color="teal" 
          onClick={handleExit}>
          Home
        </Button>
      </div>
    </Rows>
  );
}

const Form = styled.form`
  display: flex;
  flex: 1;
  align-items: center;
  input {
    flex: 1;
    margin-right: 1rem;
    max-width: 12rem;
  }
`;

const Rules = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  ul {
    padding: 0;
  }
  li {
    display: flex;
    align-items: center;
    span {
      width: 14rem;
    }
  }
  li + li {
    margin-top: 0.5rem;
  }
`;

const Rows = styled.section`
  border-top: 1px solid ${themedPalette.border4};
  ${media.small} {
    margin-top: 0rem;
  }
  .button-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 2rem;
    ${media.small} {
      margin-top: 1rem;
    }
  }
`;

export default SettingRows;
