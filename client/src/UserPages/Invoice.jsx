import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Button } from '@mui/material';


  

const styles = StyleSheet.create({
    page: {
      padding: 40,
    },
    section: {
      marginBottom: 10,
      padding:20
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign:'center',
      marginTop:10,
      paddingTop:10,
      paddingBottom:10,
    },
    label: {
      fontWeight: 'bold',
      marginRight: 10,
    },
    value: {
    },
    printButton:{
        marginTop:20,
        marginBottom:10
    }
  });

function Invoice({data}) {
  return (
    <div>
        <Document >
      <Page  size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header} >INVOICE BILL</Text>
          <br />
        </View><br />
        <View style={styles.section}>
          <Text style={styles.label}>UserId:</Text>
          <Text style={styles.value}>{data.userId}</Text>
        </View><br />
        <View style={styles.section}>
          <Text style={styles.label}>OrderId:</Text>
          <Text style={styles.value}>{data.id}</Text>
        </View><br />
        <View style={styles.section}>
          <Text style={styles.label}>Amount Paid:</Text>
          <Text style={styles.value}>₹{data.amount}</Text>
        </View><br />
        <View style={styles.section}>
          <Text style={styles.label}>Receipt:</Text>
          <Text style={styles.value}>{data.receipt}</Text>
        </View><br />
        <View style={styles.section}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{data.status}</Text>
        </View><br />
        <View style={styles.section}>
          <Text style={styles.label}>Entity:</Text>
          <Text style={styles.value}>{data.entity}</Text>
        </View><br />
        <View style={styles.section}>
          <Text style={styles.label}>Currency:</Text>
          <Text style={styles.value}>{data.currency}</Text>
        </View><br />
        <View style={styles.section}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{new Date(data.date).toLocaleDateString('en-GB')}</Text>
        </View><br />
        <View style={styles.section}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>{new Date(data.date).toLocaleTimeString('en-US')}</Text>
        </View><br />
        <View style={styles.section}>
        
        </View>
      </Page>
    </Document>
    </div>
  )
}

export default Invoice