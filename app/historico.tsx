import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const BASE_URL = 'http://192.168.100.70:3000';

export default function HistoricoScreen() {
  const [historico, setHistorico] = useState<any>([]);

  useEffect(function() {
    // Faz o fetch pra pegar a lista de pesquisas salvas lá no Node
    fetch(`${BASE_URL}/localizacoes`)
      .then(function(res) { return res.json(); })
      .then(function(dados: any) {
        setHistorico(dados.reverse()); 
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>Histórico de Pesquisas</Text>
      
      <FlatList
        data={historico}
        // Coloquei o i como any pro TS não reclamar do index da lista
        keyExtractor={function(_, i: any) { return String(i); }}
        renderItem={function(elemento: any) {
          let item = elemento.item;
          
          return (
            <View style={styles.card}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#20ebc3' }}>
                Busca: {item.pesquisa}
              </Text>
              
              <Text style={{ marginTop: 4 }}>Unidades encontradas: {item.totalUnidades}</Text>
              <Text style={{ color: '#666', fontSize: 12 }}>Lat: {item.latitude} | Lng: {item.longitude}</Text>
              
              {/* Transforma aquela data esquisita cheia de traço e T no formato brasileiro normal */}
              <Text style={{ color: '#999', fontSize: 11, textAlign: 'right', marginTop: 5 }}>
                {new Date(item.dataSalva).toLocaleString('pt-BR')}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#afe0da', marginTop: 20 },
  card: { 
    backgroundColor: '#f5f9f9', 
    padding: 12, 
    marginBottom: 8, 
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#06e6b2d9', 
    elevation: 1 
  }
});