import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import styles from './TeaserNavBar.module.css'
import { FaSearch } from 'react-icons/fa';


const TeaserNavBar = ({categories, markers, setSearchText, searchText, filteredCategories, toggleCategory, setShowTeaser}) => {

  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const toggleSearchBar = () => {
    setIsSearchBarOpen((isSearchBarOpen) => !isSearchBarOpen)
  }


  return (
    <div className={isSearchBarOpen ? styles.navBar:styles.navBarNormal}>
      <div className={isSearchBarOpen ? styles.innerFrame:styles.innerFrameNormal}>

        <span className={styles.text}>{isSearchBarOpen ? "Search" : "Milbertshofen am Hart"}</span>
        <button style={{fontSize: "large"}} onClick={toggleSearchBar} ><FaSearch/></button>
        <button onClick={ ()=>{setShowTeaser(false)} }>
          <svg className={styles.crossButton} xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
          <path d="M21.6907 20.4968C21.7691 20.5752 21.8313 20.6682 21.8737 20.7707C21.9161 20.8731 21.938 20.9829 21.938 21.0937C21.938 21.2046 21.9161 21.3144 21.8737 21.4168C21.8313 21.5192 21.7691 21.6123 21.6907 21.6907C21.6123 21.7691 21.5192 21.8313 21.4168 21.8737C21.3144 21.9161 21.2046 21.938 21.0937 21.938C20.9829 21.938 20.8731 21.9161 20.7707 21.8737C20.6682 21.8313 20.5752 21.7691 20.4968 21.6907L13.5 14.6928L6.50318 21.6907C6.34486 21.849 6.13013 21.938 5.90623 21.938C5.68233 21.938 5.4676 21.849 5.30928 21.6907C5.15096 21.5324 5.06201 21.3176 5.06201 21.0937C5.06201 20.8698 5.15096 20.6551 5.30928 20.4968L12.3071 13.5L5.30928 6.50318C5.15096 6.34486 5.06201 6.13013 5.06201 5.90623C5.06201 5.68233 5.15096 5.4676 5.30928 5.30928C5.4676 5.15096 5.68233 5.06201 5.90623 5.06201C6.13013 5.06201 6.34486 5.15096 6.50318 5.30928L13.5 12.3071L20.4968 5.30928C20.6551 5.15096 20.8698 5.06201 21.0937 5.06201C21.3176 5.06201 21.5324 5.15096 21.6907 5.30928C21.849 5.4676 21.938 5.68233 21.938 5.90623C21.938 6.13013 21.849 6.34486 21.6907 6.50318L14.6928 13.5L21.6907 20.4968Z" fill="#424941"/>
          </svg>
        </button>

        
        
      </div>
      {isSearchBarOpen && 
      <div className={styles.searchBarPanel}>
            <div className={styles.searchBar}>
                <input name="search" onChange={(value)=>{setSearchText(value.target.value)}} value={searchText} placeholder="Type a destination..."/>
                
            </div>
            <div className={styles.filterBar}>
                <div className={styles.filter}>
                    {categories && categories.map((category)=>(<div style={ filteredCategories.includes(category.name) ? { "background": "#ecc27a"} : {} } onClick={()=>{toggleCategory(category.name)}} key={category.id} className={styles.categoryFilter}>{category.name}</div>))}
                </div>
            </div>
        </div>
      }
    </div>

  )
}

export default TeaserNavBar