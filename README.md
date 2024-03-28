# React Native - Ignite Teams

## Tecnologias

### React Native svg e ícones

Permite utilizar imagens em formato `.svg` com a lib do `expo`

```bash
npx expo install react-native-svg
```

#### Phosphor Icons React Native

Usar a biblioteca de ícones para a versão do RN.

```bash
npm install phosphor-react-native
```

### Utilização de imagem e tipagem de `.png`:

```tsx
import { Image } from 'react-native';
import logoImg from '../assets/logo.png';

return <Image source={logoImg} />;
```

#### Tipagem do .png

```ts
declare module '*.png';
```

---

### Styled Components React Native

Componentes estilizados e utilização de temas. **A maior diferença para a versão WEB fica na tipagem e apontamento para a versão RN**

#### Importação e Utilização

```ts
//styles.ts

import 'styled-components/native';

export const Container = styled.View`
  color: red;
`;
```

#### Tipagem do tema:

```ts
//tipagem
import 'styled-components/native';
import theme from '../theme'; //caminho do tema

//importante usar o '/native' aqui também.
declare module 'styled-components/native' {
  type ThemeType = typeof theme;
  export interface DefaultTheme extends ThemeType {}
}
```

#### Adicionando estilização em atributos com `attrs`

Para que seja possível consumir o tema da aplicação e não precisar estilizar no próprio arquivo `.tsx` podemos usar no `styles.ts` o seguinte código:

```ts
//Aqui mudamos os atributos 'size' e 'color' através do arquivo de estilização
export const BackIcon = styled(CaretLeft).attrs(({ theme }) => ({
  size: 32,
  color: theme.COLORS.WHITE,
}))``;
```

---

### União de tipos com `type` no Typescript

Caso criarmos um componente personalizado e também seja necessário extender a tipagem do componente nativo, podemos utilizar como base o código:

```ts
//Importa tipagem do touchable opacity que vem do RN
import { TouchableOpacityProps } from 'react-native';

//Com o caractere '&' adiciona os tipos nativos + o que for definido entre chaves
type GroupCardProps = TouchableOpacityProps & {
  title: string;
};
```

### CSS Helper do StyledComponents

Quando há o uso de muitas variáveis como `theme`, `type`, `variant` e outras em um componente só pode ser que o `css` helper do styled-components contribua em termos de simplificar a sintaxe.

```ts
import styled, { css } from 'styled-components/native';

//Com isso `theme` não precisa ser desestruturado em todas propriedades.
export const NumbersOfPlayers = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_200};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.SM}px;
  `};
`;
```

### 'keyof' 'typeof' Typescript para tipagem

Quando temos uma listagem de possíveis chaves que podem ser usadas em um atributo, por exemplo, de uma biblioteca de iconografia, pode ser interessante deixarmos explícito na tipagem do componente os ícones aceitos. Segue exemplo:

```ts
import { MaterialIcons } from '@expo/vector-icons';

type ButtonIconProps = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
};
```

---

### Navegação com React Navigate

1. Instalar a biblioteca core React Navigation

```bash
npm install @react-navigation/native
```

2. Instalar dependências para projetos `expo`

```bash
npx expo install react-native-screens react-native-safe-area-context
```

3. Instalar a estratégia de navegação (Stack, Drawer, Tab)

```bash
npm install @react-navigation/native-stack
```

#### Tipando as rotas em `@types/`

É interessante tipar quais rotas existem na nossa aplicação e principalmente quais `params` são esperados em cada uma das rotas

1. Criar um arquivo `navigation.d.ts`

2. Reescrever a tipagem do módulo no arquivo

```ts
export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      groups: undefined;
      new: undefined;
      players: {
        group: string;
      };
    }
  }
}
```

#### Enviando e consumindo um parâmetro de rota

Em alguns momentos precisamos trocar informações entre páginas da nossa aplicação, para isso, podemos utilizar a lib `react-navigation` e seus hooks

1. Importe o hook `useNavigation()`

```ts
import { useNavigation } from '@react-navigation/native';
```

2. Declare a referência para o hook em uma variável

```ts
const navigation = useNavigation();
```

3. Para navegar e enviar parâmetros use `navigate`

```ts
navigation.navigate('route', { state });
```

4. Para receber parâmetros:

É importante utilizar o hook `useRoute`, que também vem do `react-navigation`. Neste é possível desestruturar os parâmetros de dentro de `route.params` o ideial também é tipar QUAIS são estes params com o alias "as" + tipagem

```ts
const route = useRoute();
const { param } = route.params as RouteParams;
```

#### Usando `useFocusEffect` para foco na página

`useFocusEffect` é bastante similar ao `useEffect`, entretanto ele é ativado sempre que a página recebe foco, ou seja: **Além do 1o carregamento ele é invocado caso ocorra uma navegação para a página**

Importação:

```ts
import { useFocusEffect } from '@react-navigation/native';
```

Uso:

```ts
useFocusEffect(
  useCallback(() => {
    fetchGroups();
  }, [])
);
```

> `useCallBack` é usado juntamente para não disparar renderizações desnecessárias, o que pode ajudar na **Performance da aplicação.**

---

### Async Storage - React Native

Similar ao localStorage do Browser. Pode ajudar a resolver problemas de `prop-drilling` uma vez que, centraliza informações em um lugar.

Instalação:

```
 npx expo instal @react-native-async-storage/async-storage
```

#### Organização e manipulações com o Async storage

A dinâmica de lidar com `AsyncStorage`, similar ao localStorage, porém **Assíncrono** é diferente e há um padrão que pode ser utilizado.

1. Criação de uma pasta somente para isso `storage`

2. Criação de um arquivo `storageConfig.ts` para definir keys do storage

Com isso, garantimos uma melhor manutenção nas keys dos elementos salvos no `AsyncStorage`

```ts
const GROUP_COLLECTION = '@ignite-teams:groups';
const PLAYER_COLLECTION = '@ignite-teams:players';

export { GROUP_COLLECTION, PLAYER_COLLECTION };
```

3. Para cada entidade, podemos criar uma pasta e vincular as funções que buscam no storage por arquivo.

Exemplo: player

Arquivos:

|-player
|playerAddByGroup.ts
|playerGetByGroup.ts
|playerRemoveByGroup.ts
|playerGetByGroup.ts
|PlayerStorageDTO.ts <-- Arquivo de tipagem para manipulações com 'player'

`playerAddByGroup.ts`

```ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError } from '../../utils/AppError'; //Classe para lidar com erros

import { PLAYER_COLLECTION } from '../storageConfig';
import { playersGetByGroup } from './playersGetByGroup';
import { PlayerStorageDTO } from './PlayerStorageDTO';

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const storedPlayers = await playersGetByGroup(group);

    const playerAlreadyExists = storedPlayers.filter(
      (player) => player.name === newPlayer.name
    );

    if (playerAlreadyExists.length > 0) {
      //Chama a classe personalizada de erro
      throw new AppError('Essa pessoa já está adicionada em um time aqui.');
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw error;
  }
}
```

---

### Usando `useRef()` para lidar com elementos

Podemos utilizar o hook useRef() para acessar a **referência de um elemento**, e assim, lidar com `focus()`, `blur()`, dentre outros.

Exemplo: Ao submeter um formulário podemos usar `blur()` no elemento de input, afinal, o usuário já digitou o que era necessário, assim o efeito de `desfoque` pode encerrar o teclado aberto e remover o foco para o input.

```ts
//Criação da referência de vinculação
const newPlayerNameInputRef = useRef<TextInput>(null);

function handleSubmit() {
  ///...

  //Desfoca o elemento
  newPlayerNameInputRef.current?.blur();
}

//IMPORTANTE adicionar o `ref` ao elemento, caso seja um componente é necessário enviar via prop.
return (
  <View>
    <Input
      inputRef={newPlayerNameInputRef}
      onChangeText={setNewPlayerName}
      value={newPlayerName}
      placeholder="Nome da pessoa"
      autoCorrect={false}
      onSubmitEditing={handleAddPlayer}
      returnKeyType="done"
    />
  </View>
);
```

---

### Utilizando uma classe personalzida para erro

Para que podemos distinguir um erro genérico/desconhecido provido por um `throw` e um erro reconhecido pela nossa aplicação podemos criar uma classe com um atributo `message` e instanciar esta classe, assim podemos recolher a `instaceof <classe>` dentro do bloco `catch`.

Exemplo:

1. Classe de erro personalizada: (/utils/AppError.ts)

```ts
export class AppError {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
```

2. Instanciação da classe

```ts
throw new AppError('Essa pessoa já está adicionada em um time aqui.');
```

3. Conferir a instaciação do erro. Caso a instância não corresponda a classe que criamos, neste caso, terá de ser lançado um erro genérico.

```ts
 catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message);
      } else {
        Alert.alert('Nova pessoa', 'Não foi possível adicionar');
        console.error(error);
      }
    }
```
