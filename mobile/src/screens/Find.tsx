import { useState } from "react";
import { Heading, VStack, Toast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../components/Header";
import { Button } from "../components/Button";

import { api } from "../services/api";

import { Input } from "../components/Input";

export function Find() {
  const [isLoading, setIsloading] = useState(false);
  const [code, setCode] = useState("");

  const {navigate} = useNavigation()

  async function handleJoinPool() {
    try {
      setIsloading(true);

      if (!code.trim()) {
        return Toast.show({
          title: "Informe o código!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post('/pools/join', {code});

      Toast.show({
        title: "Você entrou no bolão com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });

      setIsloading(false);
      navigate('pools');

    } catch (error) {
      console.log(error);
      setIsloading(false);

      if (error.response?.data?.message === "Pool not found.") {
        return Toast.show({
          title: "Bolão não encontrado!",
          placement: "top",
          bgColor: "red.500",
        });
      }
      if (error.response?.data?.message === "You already joined this pool.") {
        return Toast.show({
          title: "Você já está nesse bolão!",
          placement: "top",
          bgColor: "red.500",
        });
      }
      Toast.show({
        title: "Nao foi possível encontrar o bolão!",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />
      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de{"\n"}
          seu código único
        </Heading>

        <Input
          mb={2}
          placeholder="Qual código do bolão?"
          onChangeText={setCode}
          autoCapitalize="characters"
        />
        <Button
          title="BUSCAR BOLÃO"
          isLoading={isLoading}
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  );
}
