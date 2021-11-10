import React, { useEffect } from "react";
import type { NextPage } from "next";
import NextImage from "next/image";
import { chakra, Heading, Stack, Text, Container, Input, Button } from "@chakra-ui/react";
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
    <chakra.div
      h="100vh"
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="top center"
      bgImage="url('/background-image.png')"
    >
      <Stack align="center" textAlign="center" spacing={{ base: 8, md: 8 }}>
        <NextImage src="/logo.png" alt="eth logo" width="150px" height="173px" />

        <Heading
          fontSize={{ base: "5xl", md: "9xl" }}
          fontWeight="900"
          bgGradient="linear-gradient(90.54deg, rgba(255, 204, 250, 0.98) -16.77%, #EBFDFF 43.34%, #B499FF 110.18%)"
          bgClip="text"
        >
          Web3 Lagos
        </Heading>

        <Container maxW="container.sm">
          <Stack spacing={{ base: 6, md: 6 }}>
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
          </Stack>
        </Container>
      </Stack>
    </chakra.div>
  );
};

export default Home;
