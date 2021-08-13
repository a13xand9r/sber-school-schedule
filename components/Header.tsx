import { IconAvatar, IconClose, IconEdit } from '@sberdevices/plasma-icons'
import { Button, Header, HeaderBack, HeaderContent, HeaderLogo, HeaderMinimize, HeaderRoot, HeaderSubtitle, HeaderTitle, HeaderTitleWrapper } from '@sberdevices/plasma-ui'
import React, { useState } from 'react'
import style from '../styles/header.module.css'

export const CustomHeader = ({ isEditMode, setEditMode }: { isEditMode: boolean, setEditMode: (flag: boolean) => void }) => {
  //   const variant = radios(
  //     'Variant',
  //     { 'Title+Subtitle': 'title+subtitle', 'Label+Title': 'label+title', Title: 'title' },
  //     'title+subtitle',
  // );
  // const [isBack, setIsBack] = useState(true);

  // return (
  //   <HeaderRoot>
  //     {isBack ? (
  //       <HeaderBack
  //       />
  //     ) : (
  //       <HeaderMinimize
  //       />
  //     )}
  //     <HeaderLogo src="./images/320_320_12.jpg" alt="Logo" />
  //     <HeaderTitleWrapper>

  //       <>
  //         <HeaderTitle>{'Header title text'}</HeaderTitle>
  //         <HeaderSubtitle>{'Subtitle text'}</HeaderSubtitle>
  //       </>

  //       {/* {variant === 'label+title' && (
  //               <>
  //                   <HeaderSubtitle>{'Label text'}</HeaderSubtitle>
  //                   <HeaderTitle>{'Header title text'}</HeaderTitle>
  //               </>
  //           )}
  //           {variant === 'title' && <HeaderTitle>{'Header title text'}</HeaderTitle>} */}
  //     </HeaderTitleWrapper>
  //     <HeaderContent>
  //       <button><IconAvatar /></button>
  //     </HeaderContent>
  //   </HeaderRoot>
  // );
  return (
    <Header
      back={false}
      title={'Школьное распиcание'}
    // onBackClick={}
    >{isEditMode ?
      <Button
        view='secondary'
        onClick={() => setEditMode(false)}
      ><IconClose />
      </Button> :
      <Button
        view='secondary'
        onClick={() => setEditMode(true)}
      ><IconEdit />
      </Button>
      }
    </Header>
  )
}