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
           Indiv User
       </div>
    )
}

export default IndivUser