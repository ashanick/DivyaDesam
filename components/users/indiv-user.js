// import { map } from 'lodash';
// import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classes from './indiv-user.module.css'
import LinkList from './linkList';

// import Card from '../ui/card'
// import UserFamilyDetails from './user-familydetails';

function IndivUser(props) {
    const {member, name,  children, grandChildren, grandParent, parents, siblings, 
        greatGrandParent, greatGrandChildren, greatGreatGrandParent, greatGreatGrandChildren,
        greatGreatGreatGrandParent, greatGreatGreatGrandChildren} = props.items
    const dob = props.items.member[0].dob
    const formattedDob = new Date(dob).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    const dod = ''
    const linkPath = `/users/${props.spouse}`
    // console.log('Indiv User props DOB: ', dob, 'Formatted date : ', formattedDob)
    var pname= member[0].name
    var pImageURL = member[0].imageURL
    // console.log('Pname', pname, 'Image : ', pImageURL)
    // console.log('Great Grandparents Indiv User: ', greatGrandParent, "Child : ", greatGrandChildren)
    var grandParentState = true
    var greatGrandParentState = true
    var greatGreatGrandParentState = true
    var greatGreatGreatGrandParentState = true
    var childrenState = true
    var grandChildrenState = true
    var greatGrandChildrenState = true
    var greatGreatGrandChildrenState = true
    var greatGreatGreatGrandChildrenState = true
    var parentState = true
    var siblingsState = true
    
    if (grandParent.length === 0) {
        grandParentState = false
    }
    if (parents.length === 0) {
        parentState = false
    }
    if (siblings.length === 0) {
        siblingsState = false
    }

    if (greatGrandParent.length === 0) {
        greatGrandParentState = false
    }

    if (greatGrandChildren.length === 0) {
        greatGrandChildrenState = false
    }
    if (greatGreatGrandParent.length === 0) {
        greatGreatGrandParentState = false
    }

    if (greatGreatGrandChildren.length === 0) {
        greatGreatGrandChildrenState = false
    }

    if (greatGreatGreatGrandParent.length === 0) {
        greatGreatGreatGrandParentState = false
    }

    if (greatGreatGreatGrandChildren.length === 0) {
        greatGreatGreatGrandChildrenState = false
    }

    if (grandChildren.length === 0) {
        grandChildrenState = false
    }

    if (grandParent.length === 0) {
        grandParentState = false
    }

    if (children.length === 0) {
        childrenState = false
    }

    if(name === '' ) {
        return (
            <div style={{margin: '2rem', textAlign: 'center'}}>
               <h2>Some Loading Error ... Please try again</h2> 
            </div>
        )
    }

    return (
        <div>
            <div className={classes.indivuser}>
                <div className={classes.indivuser__image}>
                    <div >
                        <div className={classes.image}>
                            <Image
                            src={'/' + pImageURL}
                            alt={pname}
                            width={250}
                            height={250}
                            layout='responsive'
                            placeholder='empty'
                            />
                        </div>
                        <div className={classes.content}>
                            <h1>{pname}</h1>
                        </div>
                    </div>
                </div>
                
                <div className={classes.content}>
                    <h2>{name}</h2>
                    
                    <div className={classes.dateDetails}>
                        <div className={classes.imageicon}>
                            <Image
                            src={'/images/baby.png'}
                            alt={pname}
                            width={25}
                            height={25}
                            layout='responsive'
                            placeholder='empty'
                            />
                        </div>
                        <p className={classes.detailpara}>Date & Place of Birth: -</p>{formattedDob}
                    </div>
                    <div className={classes.dateDetails}>
                        <div className={classes.imageicon}>
                            <Image
                            src={'/images/couple.png'}
                            alt={pname}
                            width={25}
                            height={25}
                            layout='responsive'
                            placeholder='empty'
                            />
                        </div>
                        <div className={classes.dateDetails__specs}> 
                            <div className={classes.dateDetails__specsp}>
                                <p className={classes.detailpara} style={{margin: '0', padding: '0'}}>
                                    Date of Marriage: -
                                </p>
                                {formattedDob}
                            </div>
                            
                            <p className={classes.detailpara} style={{margin: '0', padding: '0'}}>
                                Spouse: -
                                <Link href={linkPath}>
                                    <a>{member[0].spouse}</a>
                                </Link>
                            </p>
                            
                        </div> 
                    </div>
                   
                   {
                       dod && 
                       <div className={classes.dateDetails}>
                        <div className={classes.imageicon}>
                            <Image
                            src={'/images/surya.png'}
                            alt={pname}
                            width={25}
                            height={25}
                            layout='responsive'
                            placeholder='empty'
                            />
                        </div>
                        <div className={classes.dateDetails__specs}> 
                            <p style={{margin: '0rem', padding: '0rem'}}>Date of death: {formattedDob}</p>
                            <p style={{margin: '0rem', padding: '0rem'}}>Cause: {member[0].spouse}</p>
                            
                        </div> 
                    </div>
                   }
                    
                    
                    {greatGreatGreatGrandParentState &&
                        <div className={classes.children}>
                            <hr style={{border: '1px solid red', marginBottom: '10px'}}/>
                            <div>
                                <h3>Great Great Great Grand Parents</h3>
                                <ul className={classes.children}>
                                    {greatGreatGreatGrandParent.map((gc, index)=> 
                                        <LinkList key = {gc.name}
                                            name={gc.name} 
                                            listIndex={index}
                                        />)
                                    }
                                </ul>
                            </div>
                        </div>   
                    }
                    {greatGreatGrandParentState && 
                        <div className={classes.children}>
                            <hr style={{border: '1px solid red', marginBottom: '10px'}}/>
                            <div>
                                <h3>Great Great Grand Parents</h3>
                                <ul className={classes.children}>
                                    {greatGreatGrandParent.map((gc, index)=> 
                                        <LinkList key = {gc.name}
                                            name={gc.name} 
                                            listIndex={index}
                                        />)
                                    }
                                </ul>
                            </div>
                        </div>   
                    }

                    {greatGrandParentState && 
                        <div className={classes.children}>
                            <hr style={{border: '1px solid red', marginBottom: '10px'}}/>
                            <div>
                                <h3>Great Grand Parents</h3>
                                <ul className={classes.children}>
                                    {greatGrandParent.map((gc, index)=> 
                                        <LinkList key = {gc.name}
                                            name={gc.name} 
                                            listIndex={index}
                                        />)
                                    }
                                </ul>
                            </div>
                        </div>   
                    }

                    {grandParentState && 
                        <div className={classes.children}>
                            <hr style={{border: '1px solid red', marginBottom: '10px'}}/>
                            <div>
                                <h3>Grand Parents</h3>
                                <ul className={classes.children}>
                                    {grandParent.map((gc, index)=> 
                                        <LinkList key = {gc.name}
                                            name={gc.name} 
                                            listIndex={index}
                                        />)
                                    }
                                </ul>
                            </div>
                        </div>   
                    }
                    
                    {parentState &&
                        <div className={classes.children}>
                            <div>
                                <hr style={{border: '1px solid red', marginBottom: '10px'}}/>
                                <h3>Parents: </h3>
                                <ul className={classes.children}>
                                    {parents.map((gc, index)=> 
                                        <LinkList key = {gc.name}
                                            name={gc.name} 
                                            listIndex={index}
                                        />)
                                    }
                                </ul>
                            </div>
                        </div>
                    }

                    {siblingsState && 
                        <div className={classes.children}>
                            <div>
                                <hr style={{border: '1px solid red', marginBottom: '10px'}}/>
                                <h3>Siblings: </h3>
                                <ul className={classes.children}>
                                    {siblings.map((gc, index)=> 
                                        <LinkList key = {gc.name}
                                            name={gc.name} 
                                            listIndex={index}
                                        />)
                                    }
                                </ul>
                            </div>
                        </div>
                    }

                    {childrenState && 
                        <div>
                            <hr style={{border: '1px solid red'}}/>
                            <h3>Children: </h3>
                            <ul className={classes.children}>
                                {children.map((gc, index)=> 
                                    <LinkList key = {gc.name}
                                        name={gc.name} 
                                        listIndex={index}
                                    />)
                                }
                            </ul>
                        </div>
                    }
                    
                    {grandChildrenState && 
                        <div>
                            <hr style={{border: '1px solid red'}}/>
                            <h3>Grand Children: </h3>
                            <ul className={classes.children}>
                                {grandChildren.map((gc, index)=> 
                                    <LinkList key = {gc.name}
                                        name={gc.name} 
                                        listIndex={index}
                                    />)
                                }
                            </ul>
                        </div>
                    }

                    {greatGrandChildrenState && 
                        <div>
                            <hr style={{border: '1px solid red'}}/>
                            <h3>Great Grand Children: </h3>
                            <ul className={classes.children}>
                                {greatGrandChildren.map((gc, index)=> 
                                    <LinkList key = {gc.name}
                                        name={gc.name} 
                                        listIndex={index}
                                    />)
                                }
                            </ul>
                        </div>
                    }
                    {greatGreatGrandChildrenState && 
                        <div>
                            <hr style={{border: '1px solid red'}}/>
                            <h3>Great Great Grand Children: </h3>
                            <ul className={classes.children}>
                                {greatGreatGrandChildren.map((gc, index)=> 
                                    <LinkList key = {gc.name}
                                        name={gc.name} 
                                        listIndex={index}
                                    />)
                                }
                            </ul>
                        </div>
                    }

                    {greatGreatGreatGrandChildrenState && 
                        <div>
                            <hr style={{border: '1px solid red'}}/>
                            <h3>Great Great Great Grand Children: </h3>
                            <ul className={classes.children}>
                                {greatGreatGreatGrandChildren.map((gc, index)=> 
                                    <LinkList key = {gc.name}
                                        name={gc.name} 
                                        listIndex={index}
                                    />)
                                }
                            </ul>
                        </div>
                    }
                </div>
            </div> 
        </div>
    )
}

export default IndivUser