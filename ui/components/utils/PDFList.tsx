import React, { useEffect, useState } from "react";
import { Page, Text, Image, Document, StyleSheet, View } from "@react-pdf/renderer";
import { IProduct } from "~/lib/types";

const styles = StyleSheet.create({
    document: {
        backgroundColor: '#F6F6F6'
    },
    listTitle: {
        color: '#232323',
        fontSize: 20,
        marginVertical: 15,
        marginBottom: 20,
        fontWeight: "black",
        textAlign: 'center',
        textDecoration: 'underline',
        paddingBottom: 20,
        fontFamily: 'Helvetica-Bold'
    },
    text: {
        color: '#232323',
        marginLeft: 20,
        paddingLeft: 50,
        marginBottom: 4,
        fontSize: 14,
        textAlign: "left",
        fontFamily: 'Helvetica'
    },
    note: {
        color: '#232323',
        marginLeft: 20,
        paddingLeft: 50,
        marginBottom: 8,
        fontSize: 12,
        textAlign: "left",
        fontFamily: 'Helvetica'
    },
    image: {
        marginHorizontal: 'auto',
        marginVertical: 20,
        width: 290
    },
    footer: {
        color: '#FFFF',
        backgroundColor: '#232323',
        fontSize: 10,
        width: '100%',
        marginTop: 'auto',
        paddingVertical: 10,
        textAlign: 'center'
    },
});

const PDFFile = () => {
    const [items, setItems] = useState<IProduct[]>([]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('list')!);
        if (items) {
            setItems(items);
        }
    }, []);

    return (
        <Document>
            <Page style={styles.document}>
                <Image style={styles.image} src='https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2Fsuperlistalogo.png?alt=media&token=d68c19ee-4acb-4a48-9ace-05b48b93031e'
                />
                <Text style={styles.listTitle}>Mi Lista:</Text>
                <View>
                    {
                        items.map(item => {
                            return (
                                <>
                                    <Text key={item.id} style={styles.text}> - {item.name}{item.nota ? `: ${item.nota}`: null }</Text>
                                    
                                </>
                            )
                        })
                    }
                </View>
                <Text style={styles.footer}>Superlista.ar © 2022 - Todos los derechos reservados. v2.0.0</Text>
            </Page>
        </Document>
    );
};

export default PDFFile;
