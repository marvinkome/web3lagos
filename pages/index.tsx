import React, { useEffect } from "react";
import type { NextPage } from "next";
import NextImage from "next/image";
import { chakra, Box, Heading, Stack, Image, Text, Container, Input, Button, Link, Icon } from "@chakra-ui/react";
import { FaTwitter } from "react-icons/fa";
import MailchimpSubscribe from "react-mailchimp-subscribe";

function Form({ subscribe, status, message }: any) {
  const [email, setEmail] = React.useState("");

  if (status === "error") {
    console.error("EMAIL ERROR:", message);
  }

  useEffect(() => {
    if (status === "success") setEmail("");
  }, [status]);

  return (
    <>
      <Stack
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          subscribe({ EMAIL: email });
        }}
        direction="row"
        border="1px solid rgba(255, 255, 255, 0.24)"
        bg="rgba(26, 13, 24, 0.87)"
        rounded="50px"
        overflow="hidden"
        px={2}
        py={2}
      >
        <Input
          variant="unstyled"
          pl={3}
          pr={1}
          _placeholder={{ color: "rgba(255, 255, 255, 0.48)" }}
          color="white"
          placeholder="Email address"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          bgImage="radial-gradient(139.24% 1879.93% at -25.95% 48.84%, #CCFBFF 0%, #FEECEC 57.36%, #D9CCFF 100%)"
          bgColor="#CCFBFF"
          _hover={{ bgColor: "#FEECEC" }}
          color="gray.800"
          rounded="24px"
          py={3}
          px={8}
          isLoading={status === "sending"}
          type="submit"
        >
          <chakra.span display={{ base: "initial", md: "none" }}>Join</chakra.span>
          <chakra.span display={{ base: "none", md: "initial" }}>Join the waitlist</chakra.span>
        </Button>
      </Stack>

      <Text display={{ base: status === null ? "initial" : "none", md: "none" }} fontSize="sm" color="#FFD1FA">
        Join the waitlist
      </Text>

      {status === "success" && (
        <Text fontSize="sm" color="#14ff00fc">
          You’ve joined the waitlist!
        </Text>
      )}

      {status === "error" && (
        <Text fontSize="sm" color="#FFD1FA">
          Looks like you already joined the waitlist :)
        </Text>
      )}
    </>
  );
}

const Home: NextPage = () => {
  return (
    <chakra.div>
      <chakra.div
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="top center"
        bgImage="linear-gradient(172.82deg, rgb(8 6 13 / 0%) 29.57%, #08060d 87%),url(/background-image.png)"
        pb="6em"
      >
        <Box align="center" textAlign="center">
          <NextImage src="/logo.png" alt="eth logo" width="150px" height="173px" />

          <Heading
            mt={8}
            fontSize={{ base: "5xl", md: "9xl" }}
            fontWeight="900"
            bgGradient="linear-gradient(90.54deg, rgba(255, 204, 250, 0.98) -16.77%, #EBFDFF 43.34%, #B499FF 110.18%)"
            bgClip="text"
          >
            Web3 Lagos
          </Heading>

          <Container maxW="container.sm" mt={8}>
            <Stack spacing={6}>
              <Text bgGradient="linear-gradient(90.3deg, #FFEBEB -2.3%, #F0EBFF 104.94%)" bgClip="text">
                A conference for people interested in building for the next phase of the internet.
              </Text>

              <MailchimpSubscribe
                url={`https://gmail.us20.list-manage.com/subscribe/post?u=${process.env.NEXT_PUBLIC_MAILCHIMP_U}&id=${process.env.NEXT_PUBLIC_MAILCHIMP_ID}`}
                render={(props) => <Form {...props} />}
              />

              <Text color="#FFD1FA" textTransform="uppercase">
                december 2021
              </Text>

              <Link href="https://twitter.com/web3lagos" isExternal>
                <Icon as={FaTwitter} fontSize="4xl" color="twitter.500" />
              </Link>
            </Stack>
          </Container>

          <Stack align="center" mt={28} spacing={6}>
            <Text
              bgGradient="linear-gradient(90.54deg, rgba(255, 204, 250, 0.98) -16.77%, #EBFDFF 43.34%, #B499FF 110.18%)"
              bgClip="text"
              fontSize="4xl"
              fontWeight="900"
            >
              Sponsors
            </Text>

            <Link href="https://helicarrier.studio/" isExternal textAlign="center">
              <Image src="/helicarrier.svg" alt="helicarrier logo" mx="auto" boxSize={{ base: "80%", md: "100%" }} />
            </Link>
          </Stack>
        </Box>
      </chakra.div>

      <Container maxW="container.lg">
        <Stack align="center" textAlign="center" my={16} spacing={16}>
          <Heading
            bgGradient="linear-gradient(90.54deg, rgba(255, 204, 250, 0.98) -16.77%, #EBFDFF 43.34%, #B499FF 110.18%)"
            bgClip="text"
            fontSize="4xl"
            fontWeight="900"
          >
            Speakers
          </Heading>

          <Stack
            direction={{ base: "column", md: "row" }}
            justify="space-around"
            spacing={{ base: 12, md: 24 }}
            w="full"
          >
            <Link href="https://twitter.com/TheLennyJohnson" isExternal>
              <Stack
                minW="280px"
                py={8}
                rounded="25px"
                spacing={3}
                align="center"
                justify="center"
                bgImage="linear-gradient(146.78deg, #7A0BEA 0%, rgba(122, 11, 234, 0) 86.34%)"
              >
                <Image src="/lenny.svg" alt="Lenny Johnson" boxSize="100px" />

                <Text color="#81C9FF" fontWeight="500">
                  Lenny Johnson
                </Text>
                <Text
                  bgGradient="linear-gradient(90.54deg, #FFFFFF -16.77%, #EBFDFF 43.34%, #B499FF 110.18%)"
                  bgClip="text"
                >
                  On Nigeria And DAOs
                </Text>
              </Stack>
            </Link>

            <Link href="https://twitter.com/obiokeke_" isExternal>
              <Stack
                minW="280px"
                py={8}
                rounded="25px"
                spacing={3}
                align="center"
                justify="center"
                bgImage="linear-gradient(146.78deg, #7A0BEA 0%, rgba(122, 11, 234, 0) 86.34%)"
              >
                <Image src="/daniel.svg" alt="Daniel Obiokeke" boxSize="100px" />

                <Text color="#81C9FF" fontWeight="500">
                  Daniel Obiokeke
                </Text>
                <Text
                  bgGradient="linear-gradient(90.54deg, #FFFFFF -16.77%, #EBFDFF 43.34%, #B499FF 110.18%)"
                  bgClip="text"
                >
                  On Smart Contracts
                </Text>
              </Stack>
            </Link>

            <Link href="https://twitter.com/afrogodd" isExternal>
              <Stack
                minW="280px"
                py={8}
                rounded="25px"
                spacing={3}
                align="center"
                justify="center"
                bgImage="linear-gradient(146.78deg, #7A0BEA 0%, rgba(122, 11, 234, 0) 86.34%)"
              >
                <Image src="/david.png" alt="David Adamu" boxSize="100px" />

                <Text color="#81C9FF" fontWeight="500">
                  David Adamu
                </Text>
                <Text
                  bgGradient="linear-gradient(90.54deg, #FFFFFF -16.77%, #EBFDFF 43.34%, #B499FF 110.18%)"
                  bgClip="text"
                >
                  On NFTs
                </Text>
              </Stack>
            </Link>
          </Stack>
        </Stack>

        <Stack align="center" textAlign="center" my={32} spacing={16}>
          <Heading
            fontWeight="900"
            bgGradient="linear-gradient(90.54deg, rgba(255, 204, 250, 0.98) -16.77%, #EBFDFF 43.34%, #B499FF 110.18%)"
            bgClip="text"
          >
            Contributors
          </Heading>

          <Stack direction={{ base: "column", md: "row" }} justify="center" spacing={{ base: 12, md: 24 }} w="full">
            <Link href="https://twitter.com/marvinkome" isExternal>
              <Stack
                minW="280px"
                py={8}
                rounded="25px"
                spacing={3}
                align="center"
                justify="center"
                bgImage="linear-gradient(146.78deg, #7A0BEA 0%, rgba(122, 11, 234, 0) 86.34%)"
              >
                <Image src="/marvin.png" alt="Marvin Kome" boxSize="100px" />

                <Text color="#81C9FF" fontWeight="500">
                  Marvin Kome
                </Text>
                <Text
                  bgGradient="linear-gradient(90.54deg, #FFFFFF -16.77%, #EBFDFF 43.34%, #B499FF 110.18%)"
                  bgClip="text"
                >
                  Development
                </Text>
              </Stack>
            </Link>

            <Link href="https://twitter.com/Roosevelt_AI" isExternal>
              <Stack
                minW="280px"
                py={8}
                rounded="25px"
                spacing={3}
                align="center"
                justify="center"
                bgImage="linear-gradient(146.78deg, #7A0BEA 0%, rgba(122, 11, 234, 0) 86.34%)"
              >
                <Image src="/roosevelt.svg" alt="Roosevelt Innocent" boxSize="100px" />

                <Text color="#81C9FF" fontWeight="500">
                  Roosevelt Innocent
                </Text>
                <Text
                  bgGradient="linear-gradient(90.54deg, #FFFFFF -16.77%, #EBFDFF 43.34%, #B499FF 110.18%)"
                  bgClip="text"
                >
                  Design
                </Text>
              </Stack>
            </Link>
          </Stack>
        </Stack>

        <Stack align="center" textAlign="center" my={32} spacing={10}>
          <Image src="/lagos.svg" alt="Lagos" boxSize={{ base: "60%", md: "20%" }} />
        </Stack>
      </Container>
    </chakra.div>
  );
};

export default Home;
