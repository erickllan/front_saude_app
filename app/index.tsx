import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as Location from "expo-location";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const [unidades, setUnidades] = useState<any>([]);
  const [filtradas, setFiltradas] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [latSalva, setLatSalva] = useState(0);
  const [longSalva, setLongSalva] = useState(0);
  const router = useRouter();

  // Ele primeiro pede permissão de GPS e, se aceita, pega as coordenadas e faz o fetch dos dados do backend.
  useEffect(function () {
    Location.requestForegroundPermissionsAsync().then(function (resultado) {
      if (resultado.status !== "granted") {
        alert("Aceita a permissão aí pô!");
        setLoading(false);
        return;
      }

      Location.getCurrentPositionAsync({}).then(function (local) {
        setLatSalva(local.coords.latitude);
        setLongSalva(local.coords.longitude);

        fetch("seu IP/unidades-saude")
          .then(function (res) {
            return res.json();
          })
          .then(function (dadosDaApi) {
            setUnidades(dadosDaApi);
            setFiltradas([]);
            setLoading(false);
          });
      });
    });
  }, []);

  // Tela de carregamento enquanto o GPS e a API não respondem
  if (loading == true) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 15,
        backgroundColor: "#c3ddde",
        marginTop: 20,
      }}
    >
      {/* Botão Histórico */}
      <TouchableOpacity
        style={{
          backgroundColor: "#35ddd2",
          padding: 15,
          borderRadius: 10,
          marginBottom: 15,
        }}
        onPress={function () {
          router.push("/historico");
        }}
      >
        <Text
          style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
        >
          VER HISTÓRICO DE BUSCAS
        </Text>
      </TouchableOpacity>

      {/* Input de Pesquisa */}
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 8,
          padding: 5,
          marginBottom: 10,
          borderWidth: 1,
          borderColor: "#14c9cf",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, marginLeft: 5 }}>🔍</Text>
        <TextInput
          style={{ height: 40, width: "90%", paddingLeft: 10 }}
          placeholder="Digita o nome, bairro ou tipo..."
          value={busca}
          onChangeText={function (textoDigitado) {
            setBusca(textoDigitado);

            if (textoDigitado == "") {
              setFiltradas([]);
            } else {
              let arrayTemporario = unidades.filter(function (item: any) {
                let tudoJunto = (
                  item.nome +
                  " " +
                  item.bairro +
                  " " +
                  item.tipo
                ).toLowerCase();
                return tudoJunto.includes(textoDigitado.toLowerCase());
              });
              setFiltradas(arrayTemporario);

              //Este POST envia para o backend a localização atual do usuário,
              fetch("http:seu IP/localizacao", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  latitude: latSalva,
                  longitude: longSalva,
                  pesquisa: textoDigitado,
                  dadosAPI: arrayTemporario,
                }),
              }).catch(function (e) {
                console.log("erro ao salvar");
              });
            }
          }}
        />
      </View>

      <FlatList ////FlatList renderiza dinamicamente as unidades de saúde filtradas.
        data={filtradas}
        keyExtractor={function (item, index) {
          return index.toString();
        }}
        renderItem={function (elemento: any) {
          let item = elemento.item;
          //estilos
          let corFundoTag = "#56b2fe";
          if (item.tipo == "UBS") corFundoTag = "#3ae242";
          if (item.tipo == "SPA/UPA") corFundoTag = "#C62828";
          if (item.tipo == "USF - Saúde da Família") corFundoTag = "#e6de00";
          if (item.tipo == "Testagem HIV/IST/AIDS - Gratuito")
            corFundoTag = "#9a1b1b";

          return (
            <View
              style={{
                backgroundColor: "white",
                padding: 15,
                marginBottom: 10,
                borderRadius: 8,
                borderLeftWidth: 5,
                borderLeftColor: corFundoTag,
              }}
            >
              {/* Tag do Tipo */}
              <View
                style={{
                  backgroundColor: corFundoTag,
                  padding: 4,
                  borderRadius: 5,
                  alignSelf: "flex-start",
                  marginBottom: 5,
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 10 }}
                >
                  {item.tipo}
                </Text>
              </View>

              {/* Informações do Item */}
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {item.nome}
              </Text>
              <Text style={{ color: "#1f1f1f" }}>
                Endereço: {item.endereco} - {item.bairro}
              </Text>
              <Text style={{ color: "#555" }}>Telefone: {item.fone}</Text>

              {item.horario != "" && item.horario != null ? (
                <Text style={{ color: "black" }}>Horário: {item.horario}</Text>
              ) : null}

              <Text style={{ color: "blue", marginTop: 5 }}>
                Atendimento: {item.especialidade}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
