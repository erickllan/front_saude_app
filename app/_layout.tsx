import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Unidades de Saúde' }} />
      <Stack.Screen name="historico" options={{ title: 'Histórico' }} />
    </Stack>
  );
}
